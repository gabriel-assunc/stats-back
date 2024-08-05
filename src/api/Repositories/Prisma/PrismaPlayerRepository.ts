import { db } from "../../../config/db.server";
import { Player } from "../../Entities/Player";
import { PlayerRepository } from "../PlayerRepository";

export class PrismaPlayerRepository<T> implements PlayerRepository<T> {
    async ListPlayerByTeamId(teamId: string): Promise<Player<T>[]> {
        return await db.player.findMany({
            where: {
                id_team: teamId
            },
            orderBy: {
                name: 'asc'
            }
        }) as Player<T>[] | []
    }

}