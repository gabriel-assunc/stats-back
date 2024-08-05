import { db } from "../../../config/db.server";
import { lolStat } from "../../Entities/lolStats";
import { LolStatsRepository } from "../LolStatsRepository";

export class PrismaLolStatsrepository implements LolStatsRepository {
    async addStat(teamId: string, stats: lolStat[]): Promise<void> {
        await db.lolStats.createMany({
            data: stats.map(s => {
                return {
                    ...s.toObject(), teamId
                }
            })
        })

        // stats.forEach(async stat => {
        //     const {
        //         id,
        //         version,
        //         win,
        //         kills,
        //         dragons,
        //         baron,
        //         towers,
        //         gold,
        //         voids,
        //         time,
        //         firstBlood,
        //         firstBrick,
        //         blueSide,
        //         game,
        //         date
        //     } = stat.toObject()

        //     await db.lolStats.create({
        //         data: {
        //             version,
        //             win,
        //             kills,
        //             dragons,
        //             baron,
        //             towers,
        //             gold,
        //             voids,
        //             time,
        //             firstBlood,
        //             firstBrick,
        //             blueSide,
        //             game,
        //             date,
        //             Team: {
        //                 connect: {
        //                     id: teamId
        //                 }
        //             }
        //         }
        //     })
        // })
    }

    async getStats(teamId: string): Promise<lolStat[] | []> {
        return await db.lolStats.findMany({
            where: {
                teamId
            }
        }) as lolStat[] | []
    }

    async deleteStats(teamId: string): Promise<void> {
        await db.lolStats.deleteMany({
            where: {
                teamId
            }
        })
    }

}