import { Page } from "puppeteer";
import { initializePage } from "../../../Puppet";
import { Stat } from "../../../Stat";
import { PlayerExtracted, ScraperAction } from "../ScrapAction";
import { BASKET } from "../../../../Endpoints/endpoints";
import { NBA_URL, PLAYER_STATS_TABLE_SELECTOR, PLAYERS_TABLE_SELECTOR, STATS_MUSE } from "./BasketSelectors";

export interface playerStats<T> {
    name: string,
    stats: T[],
}

class BasketAction implements ScraperAction {
    async updateTeams(competitionName: string): Promise<{ url: string, teamName: string[] }> {
        const page = await initializePage(NBA_URL + "&Season=" + competitionName)

        const result = await page.$$eval('tr', rows => {
            return Array.from(rows, row => {
                const columns = row.querySelectorAll('td');
                return Array.from(columns, column => column.innerText);
            });
        });

        await page.browser().close()

        const getTeamName = result?.map((RowData) => RowData[1])
        const flatTeamname = getTeamName?.filter((team: string) => {
            if (!Number(team)) return team
        })

        return { url: BASKET, teamName: flatTeamname }
    }

    getStatsUrl(url: string, competitionYear: number) {
        return url.substring(0, url.length - 5) + '/roster/' + competitionYear
    }

    async getToStatsPage(page: Page, teamName: string, competitionYear: number) {
        let stats_url = ''
        await page.type('textarea', teamName)
        await page.$eval('form', form => form.submit())
        await page.waitForNavigation()

        stats_url = this.getStatsUrl(page.url(), competitionYear)
        await page.goto(stats_url)
    }

    async getPlayers(page: Page) {
        return await page.$$eval(PLAYERS_TABLE_SELECTOR, rows => {
            return Array.from(rows, column => {
                return { name: column.innerText, href: column.href }
            }) as PlayerExtracted[]
        })
    }

    async updateTeamStats(teamName: string, competitionName: string): Promise<playerStats<Stat>[] | []> {
        let np = []
        const competitionYear = new Number(competitionName.substring(0, 4)).valueOf() + 1
        const page = await initializePage(STATS_MUSE)

        await this.getToStatsPage(page, teamName, competitionYear)

        const players = await this.getPlayers(page)
        for (let p in players) {
            np.push(await this.updatePlayerStats(players[p], competitionYear))
        }
        await page.browser().close()
        return np
    }

    async updatePlayerStats(player: PlayerExtracted, competitionYear: number): Promise<playerStats<Stat>> {
        const playerGameLog = player.href + '/game-log?seasonYear=' + competitionYear
        const page = await initializePage(playerGameLog)

        const StatTable = await page.$$eval(PLAYER_STATS_TABLE_SELECTOR, rows => {
            return Array.from(rows, row => {
                const columns = row.querySelectorAll('td');
                return Array.from(columns, column => column.innerText);
            })
        })
        const getEachStat = StatTable.filter(stat => stat[0]?.toLocaleLowerCase() != 'average')
        const getRawStat = getEachStat?.map(data => {
            return data?.filter((a, index) => index > 3)
        })

        const statsObject = getRawStat.map(t => new Stat(t))
        await page.browser().close()
        return { name: player.name, stats: statsObject }
    }

}

export default BasketAction