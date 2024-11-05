import { lolStat } from "../Entities/lolStats"

export interface LolStatsRepository {
    addStat(teamName: string, competitionId: string, stats: lolStat[]): Promise<void>
    getStats(teamId: string): Promise<lolStat[] | []>
    deleteStats(lolStats: lolStat[]): Promise<void>
}