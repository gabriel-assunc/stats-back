import { playerStats } from "./Basket/BasketScrap"

export type PlayerExtracted = {
    name: string,
    href: string
}

export interface ScraperAction {
    updateTeams(competitionName: string): Promise<{ url: string, teamName: string[] }>
    updateTeamStats(teamName: string, competitionName: string): Promise<playerStats<any>[] | []>
    updatePlayerStats(player: PlayerExtracted, competitionYear: number): Promise<playerStats<any>>
}