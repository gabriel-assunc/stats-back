import { Stat } from "../Entities/Stat";

export interface StatsRepository {
    addStat(teamId: string, playerId: string, data: Stat): Promise<void>
    deleteStatsPlayers(playerName: string): Promise<void>
    listPlayerStat(playerName: string, teamId: string): Promise<Stat[] | []>
}
