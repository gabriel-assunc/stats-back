import { LOL } from "../../../../Endpoints/endpoints";
import { Competition } from "../../../Competition";
import { initializePage } from "../../../Puppet";
import { CompetitionAction } from "../CompetitionAction";
import { LOL_URL, SEASON_TAB_SELECTOR, SEASON_TABLE_SELECTOR } from "./LolSelectors";

export class LolCompetition implements CompetitionAction {

    async getCompetition(): Promise<{ categoryUrl: string; competitions: Competition[]; }> {
        const page = await initializePage(LOL_URL)

        const seasonsTabs = await page.$$(SEASON_TAB_SELECTOR)
        const competitionsTotal = [] as any[]
        for (let tabIndex in seasonsTabs) {
            seasonsTabs[tabIndex].click()
            await page.waitForResponse((res) => res.request().url() === 'https://gol.gg/tournament/ajax.trlist.php')
            competitionsTotal.push(await page.$$eval(SEASON_TABLE_SELECTOR, (row) => {
                return Array.from(row, (column) => {
                    return {
                        name: column?.children[1]?.textContent,
                        region: column?.children[2]?.textContent,
                        season: document.querySelector('.game-menu-button-active').textContent
                    }
                })
            }))
        }

        await page.browser().close()
        const competitions = competitionsTotal.flat(1)?.map(comp => {
            return new Competition({
                name: comp.name,
                region: comp.region,
                season: comp.season
            })
        })

        return { categoryUrl: LOL, competitions }
    }

}