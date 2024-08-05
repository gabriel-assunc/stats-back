import { Competition } from "../../Competition"

export interface CompetitionScraped {
    name: string,
    region: string
}

export interface CompetitionAction {
    getCompetition(): Promise<{ categoryUrl: string, competitions: Competition[] }>
}