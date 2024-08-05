import { Page } from "puppeteer";
import { LOL } from "../../../../Endpoints/endpoints";
import { gotoNewPage, initializePage } from "../../../Puppet";
import { PlayerExtracted, ScraperAction } from "../ScrapAction";
import { lolStat } from "../../../lolStats";
import { playerStats } from "../Basket/BasketScrap";
import {
    BLUE_SIDE_TEAM_SELECTOR,
    COMPETITION_SELECTOR,
    MATCH_DATE_SELECTOR,
    MATCH_GAME_TAB_SELECTOR,
    MATCH_RESULT_SELECTOR,
    MATCH_STATS_SELECTOR,
    MATCH_TIME_SELECTOR,
    MATCH_VERSION_SELECTOR,
    MATCH_VOIDS_SELECTOR,
    TEAM_SELECTOR
} from "./LolSelectors";

const GOL_BASE = "https://gol.gg";
const LOL_PAGE = GOL_BASE + "/teams/list/season-ALL/split-ALL/tournament-";
const BLUE_SIDE = 1
const RED_SIDE = 2

type ScrapedLolStats = {
    teamSide: number,
    time: string,
    version: string,
    voids: string,
    win: boolean;
    kills: string;
    towers: string;
    dragons: string;
    firstBrick: boolean;
    firstBlood: boolean;
    baron: string;
    gold: string;
    date: string;
    game: string
}

export class LolScrap implements ScraperAction {
    formatUrl(competitionName: string) {
        return LOL_PAGE + competitionName.replace(" ", "%20") + "/"
    }

    async updateTeams(competitionName: string): Promise<{ url: string, teamName: string[] }> {
        const formatedUrl = this.formatUrl(competitionName)
        const page = await initializePage(formatedUrl)

        const teamNames = await page.$$eval(TEAM_SELECTOR, (teamNames) => {
            return Array.from(teamNames, (cell) => {
                return cell.innerText
            })
        })

        await page.browser().close()
        return { url: LOL, teamName: teamNames }
    }

    async getTeamPageOnCompetition(page: Page, teamName: string) {
        const teamsList = await page.$$eval(COMPETITION_SELECTOR, (teams) => {
            return Array.from(teams, team => {
                return {
                    href: team.href,
                    name: team.textContent
                }
            })
        })

        return teamsList.filter(team => team.name === teamName)[0].href
    }

    async getTeamMatchResult(page: Page) {
        return await page.$$eval(MATCH_RESULT_SELECTOR, (rows) => {
            return Array.from(rows, row => {
                return {
                    score: row.cells[1].textContent,
                    gameHref: row.cells[13].children[0].getAttribute('href')
                }
            })
        })
    }

    async getTeamSide(page: Page, teamName: string) {
        const blueSide = await page.$$eval(BLUE_SIDE_TEAM_SELECTOR, div => {
            return div[0].innerText
        })

        return blueSide.includes(teamName) ? BLUE_SIDE : RED_SIDE
    }

    getStatsFromScraped(scrapedLolStats: ScrapedLolStats) {
        const { teamSide, time, version, voids, win, kills, towers, dragons, firstBrick, firstBlood, baron, gold, date, game } = scrapedLolStats
        return new lolStat({
            time,
            version,
            voids: new Number(voids).valueOf(),
            win,
            kills: new Number(kills).valueOf(),
            towers: new Number(towers).valueOf(),
            dragons: new Number(dragons).valueOf(),
            firstBrick, firstBlood,
            baron: new Number(baron).valueOf(),
            blueSide: teamSide === BLUE_SIDE,
            gold: new Number(gold.replace('k', '')).valueOf(),
            date: date.split(' ')[0],
            game
        })
    }

    async getStats(page: Page, teamSide: number, game: string) {

        const time = await page.$$eval(MATCH_TIME_SELECTOR, element => element[0].innerText)
        const version = await page.$$eval(MATCH_VERSION_SELECTOR, element => element[0].innerText)
        const gameStats = await page.$$eval(MATCH_STATS_SELECTOR(teamSide), (divs: HTMLElement[]) => {
            return {
                win: divs[0].innerText.includes('WIN'),
                kills: divs[1].children[0].textContent,
                towers: divs[1].children[1].textContent,
                dragons: divs[1].children[2].textContent,
                firstBrick: divs[1].children[1].children.length > 2,
                firstBlood: divs[1].children[0].children.length > 2,
                baron: divs[1].children[3].textContent,
                gold: divs[1].children[4].textContent,
            }
        })
        const voids = await page.$$eval(MATCH_VOIDS_SELECTOR(teamSide + 1), (element: HTMLElement[]) => element[0]?.innerText || '0')
        const date = await page.$$eval(MATCH_DATE_SELECTOR, element => element[0].innerText)

        return new lolStat(this.getStatsFromScraped({
            teamSide,
            time,
            version,
            voids,
            date,
            game,
            ...gameStats
        }))
    }

    async getTeamStat(teamName: string, page: Page, matchUrl: string, game = "GAME 1") {
        const statPage = await gotoNewPage(page, matchUrl)
        const teamSide = await this.getTeamSide(statPage, teamName)
        const stats = await this.getStats(statPage, teamSide, game)
        await statPage.close()
        return stats
    }

    async getTeamStatsFromSeries(teamName: string, page: Page, matchUrl: string) {
        const statPage = await gotoNewPage(page, matchUrl)
        const stats = []
        const gameLink = (await statPage.$$eval(MATCH_GAME_TAB_SELECTOR, tab => {
            return Array.from(tab, element => {
                if (element.innerText.toLowerCase().includes('game')) return {
                    url: element.href,
                    game: element.innerText
                }
            })
        })).filter(links => !!links)

        for (let i in gameLink) {
            stats.push(await this.getTeamStat(teamName, page, gameLink[i].url, gameLink[i].game))
        }
        await statPage.close()
        return stats
    }

    async scrapStats(page: Page, teamName: string, resultsHref: {
        score: string;
        gameHref: string;
    }[]) {
        const stats = []
        for (let i in resultsHref) {
            const matchResultPage = GOL_BASE + resultsHref[i].gameHref.replace('..', '')
            stats.push(...await this.getTeamStatsFromSeries(teamName, page, matchResultPage))
        }
        return stats
    }

    async updateTeamStats(teamName: string, competitionName: string): Promise<playerStats<lolStat>[] | []> {
        const formatedUrl = this.formatUrl(competitionName)
        const page = await initializePage(formatedUrl)
        let stats = []
        const teamUrl = await this.getTeamPageOnCompetition(page, teamName)
        await page.goto(teamUrl.replace('team-stats', 'team-matchlist'))

        const matchResult = (await this.getTeamMatchResult(page)).filter(({ score }) => score.includes('-'))

        stats = await this.scrapStats(page, teamName, matchResult)

        await page.browser().close()

        return [{ name: teamName, stats: stats }]
    }
    async updatePlayerStats(player: PlayerExtracted): Promise<playerStats<lolStat>> {
        throw new Error("Method not implemented.");
    }

}