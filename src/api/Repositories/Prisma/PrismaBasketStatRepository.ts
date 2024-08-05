'use client'
import { db } from "../../../config/db.server";
import { Stat } from "../../Entities/Stat";
import { StatsRepository } from "../BasketStatsRpository";

export class PrismaBasketStatRepository implements StatsRepository {

    async listPlayerStat(playerName: string, teamId: string): Promise<Stat[] | []> {
        let stats = []
        stats = await db.basketStats.findMany({
            where: {
                Player: {
                    name: playerName,
                    id_team: teamId
                },
            }, select: {
                pts: true,
                ast: true,
                reb: true,
                three_pointers: true,
                three_porcentage: true
            }
        }) as Stat[] | []

        return stats
    }

    async deleteStatsPlayers(playerName: string): Promise<void> {
        await db.basketStats.deleteMany({
            where: {
                Player: {
                    name: playerName
                }
            }
        })
    }

    async addStat(teamId: string, playerName: string, data: Stat): Promise<void> {
        const {
            id,
            score,
            min,
            fgm,
            fga,
            fg,
            three_pointers,
            three_attempted,
            three_porcentage,
            ftm,
            fta,
            ft_porcentage,
            ts_porcentage,
            oreb,
            dreb,
            reb,
            ast,
            stl,
            blk,
            tov,
            pf,
            pts,
            plus_minus
        } = data.toObject();

        await db.basketStats.create({
            data: {
                score: score,
                min: min,
                fgm: fgm,
                fga: fga,
                fg: fg,
                three_pointers: three_pointers,
                three_attempted: three_attempted,
                three_porcentage: three_porcentage,
                ftm: ftm,
                fta: fta,
                ft_porcentage: ft_porcentage,
                ts_porcentage: ts_porcentage,
                oreb: oreb,
                dreb: dreb,
                reb: reb,
                ast: ast,
                stl: stl,
                blk: blk,
                tov: tov,
                pf: pf,
                pts: pts,
                plus_minus: plus_minus,
                Player: {
                    connectOrCreate: {
                        where: {
                            name: playerName,
                            team: {
                                id: teamId
                            }
                        },
                        create: {
                            name: playerName,
                            team: {
                                connect: {
                                    id: teamId
                                }
                            }
                        },
                    }
                }
            },
        })
    }
}