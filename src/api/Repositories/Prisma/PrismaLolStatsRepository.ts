import { db } from "../../../config/db.server";
import { lolStat } from "../../Entities/lolStats";
import { LolStatsRepository } from "../LolStatsRepository";

export class PrismaLolStatsrepository implements LolStatsRepository {
    async addStat(teamName: string, competitionId: string, stats: lolStat[]): Promise<void> {
        stats.forEach(async stat => {
            const {
                id,
                version,
                win,
                kills,
                dragons,
                baron,
                towers,
                gold,
                voids,
                time,
                firstBlood,
                firstBrick,
                blueSide,
                game,
                playedAgainst,
                date
            } = stat.toObject()

            await db.lolStats.upsert({
                where: {
                    date_game_playedAgainst: {
                        date,
                        playedAgainst,
                        game
                    }
                },
                update: {
                    version,
                    win,
                    kills,
                    dragons,
                    baron,
                    towers,
                    gold,
                    voids,
                    time,
                    firstBlood,
                    firstBrick,
                    blueSide,
                    Team: {
                        connect: {
                            name_competitionId: {
                                name: teamName,
                                competitionId
                            }
                        }
                    }
                },
                create: {
                    version,
                    win,
                    kills,
                    dragons,
                    baron,
                    towers,
                    gold,
                    voids,
                    time,
                    firstBlood,
                    firstBrick,
                    blueSide,
                    game,
                    date,
                    PlayedAgainst: {
                        connect: {
                            name_competitionId: {
                                name: playedAgainst,
                                competitionId
                            }
                        }
                    },
                    Team: {
                        connect: {
                            name_competitionId: {
                                name: teamName,
                                competitionId
                            }
                        }
                    }
                }
            })
        })
    }

    async getStats(teamId: string): Promise<lolStat[] | []> {
        return await db.lolStats.findMany({
            where: {
                teamId
            }
        }) as lolStat[] | []
    }

    async getOpponentStat(date: string, game: string, teamId: string): Promise<lolStat> {
        return await db.lolStats.findFirst({
            where: {
                date,
                game,
                teamId
            }
        }) as lolStat | null
    }

    async deleteStats(lolStats: lolStat[]): Promise<void> {
        for (let i = 0; i < lolStats.length; i++) {
            const { date, game, playedAgainst } = lolStats[i]

            await db.lolStats.deleteMany({
                where: {
                    date,
                    game,
                    PlayedAgainst: {
                        name: playedAgainst
                    }
                }
            })
        }
    }

}