import { db } from "../../../config/db.server";
import { BasketTeamType, TeamRepository } from "../TeamRepository";

export class PrismaTeamRepository implements TeamRepository {

    async getTeam(teamId: string): Promise<BasketTeamType> {
        return await db.team.findFirst({
            where: {
                id: teamId
            },
            select: {
                name: true,
                id: true,
                Competition: {
                    select: {
                        name: true,
                        id: true
                    }
                }
            }
        })
    }

    async listTeam(categoryURL: string, competitionId: string): Promise<BasketTeamType[]> {
        return await db.team.findMany({
            where: {
                category: {
                    url: '/' + categoryURL
                },
                competitionId
            },
            orderBy: {
                name: 'asc'
            }
        })
    }

    async addTeamName(categoryURL: string, competitionId: string, teamNames: string[]): Promise<void> {
        for (let i in teamNames) {
            const team = teamNames[i]
            await db.team.upsert({
                where: {
                    name_competitionId: {
                        name: team,
                        competitionId
                    }
                },
                update: {
                    name: team
                },
                create: {
                    name: team,
                    category: {
                        connect: {
                            url: categoryURL
                        }
                    },
                    Competition: {
                        connect: {
                            id: competitionId
                        }
                    }
                }
            })
        }
    }

}