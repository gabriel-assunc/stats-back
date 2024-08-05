import { LolStatsRepository } from "../../Repositories/LolStatsRepository";

export class ListLolTeamStats {
    private repository: LolStatsRepository

    constructor(repository: LolStatsRepository) {
        this.repository = repository
    }

    async execute(teamId: string) {
        const teamStats = await this.repository.getStats(teamId)
        return teamStats
    }
}