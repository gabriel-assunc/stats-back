import { BASKET } from "../../../../Endpoints/endpoints";
import { Competition } from "../../../Competition";
import { initializePage } from "../../../Puppet";
import { CompetitionAction } from "../CompetitionAction";
import {
    NBA_URL,
    YEAR_NBA_SELECTOR
} from "./BasketSelectores";

export class BasketCompetition implements CompetitionAction {
    async getCompetition(): Promise<{ categoryUrl: string, competitions: Competition[] }> {
        const page = await initializePage(NBA_URL)

        const competitionScraped = await page.$$eval(YEAR_NBA_SELECTOR, options => {
            return Array.from(options, column => {
                return {
                    name: column.innerText,
                    region: 'NA',
                    season: (Number(column.innerText.split('-')[0]) + 1).toString()
                }
            })
        })
        const competitions = competitionScraped.map(values => new Competition({ ...values }))
        await page.browser().close()
        return { categoryUrl: BASKET, competitions }
    }
}