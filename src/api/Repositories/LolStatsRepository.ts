import { lolStat } from "../Entities/lolStats"

export interface LolStatsRepository {
    addStat(teamId: string, stats: lolStat[]): Promise<void>
    getStats(teamId: string): Promise<lolStat[] | []>
    deleteStats(teamId: string): Promise<void>
}