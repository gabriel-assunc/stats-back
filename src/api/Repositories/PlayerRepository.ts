import { Player } from "../Entities/Player"

export interface PlayerRepository<T> {
    ListPlayerByTeamId(teamId: string): Promise<Player<T>[]>
}