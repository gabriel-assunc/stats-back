import { db } from "../../../config/db.server";
import { Competition } from "../../Entities/Competition";
import { CompetitionRepository } from "../CompetitionRepository";

export class PrismaCompetitionRepository implements CompetitionRepository {
    async getCompetitionById(id: string): Promise<Competition> {
        const dataFromDb = await db.competition.findFirst({
            where: {
                id
            }
        })

        return new Competition(dataFromDb)
    }

    async addCompetition(categoryUrl: string, competition: Competition): Promise<void> {
        const { name, region, season } = competition.toObject()

        try {
            await db.competition.upsert({
                where: {
                    name_season: {
                        name,
                        season
                    },
                    Category: {
                        url: categoryUrl
                    }
                },
                update: {
                    name,
                    region,
                    season,
                },
                create: {
                    name,
                    region,
                    season,
                    Category: {
                        connect: {
                            url: categoryUrl
                        }
                    }
                }
            })
        }
        catch (e) {
            console.log({ name, region, season })
        }
    }

    async getSeasons(categoryUrl: string): Promise<string[] | []> {
        const seasons = await db.competition.groupBy({
            by: ['season'],
            where: {
                Category: {
                    url: categoryUrl
                }
            },
            orderBy: {
                season: 'asc'
            }
        }).then(res => res?.map(grouped => grouped?.season))
        return seasons
    }

    async listCompetition(categoryUrl: string): Promise<[] | Competition[]> {
        return await db.competition.findMany({
            where: {
                Category: {
                    url: categoryUrl
                }
            },
            orderBy: {
                name: 'desc'
            },

        }) as Competition[] | []
    }

    async getCompetitionBySeason(season: string, categoryUrl: string): Promise<Competition[] | []> {
        let competition = await db.competition.findMany({
            where: {
                season,
                Category:{
                    url: categoryUrl
                }
            }
        }) as Competition[] | []

        return competition
    }

}