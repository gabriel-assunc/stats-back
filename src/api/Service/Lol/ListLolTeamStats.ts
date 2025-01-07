import { lolStat } from "../../Entities/lolStats";
import { LolStatsRepository } from "../../Repositories/LolStatsRepository";

interface teamMatchStats {
    teamStats: lolStat,
    opponent: lolStat
}

export class ListLolTeamStats {
    private repository: LolStatsRepository

    constructor(repository: LolStatsRepository) {
        this.repository = repository
    }

    async execute(teamId: string) {
        const teamStats = await this.repository.getStats(teamId)
        const teamMatchStats = [] as teamMatchStats[]

        for (let i = 0; i < teamStats.length; i++) {
            const { date, game, playedAgainst } = teamStats[i]
            const opponent = await this.repository.getOpponentStat(date, game, playedAgainst)

            teamMatchStats.push({
                teamStats: teamStats[i],
                opponent: opponent
            })
        }

        return teamMatchStats
    }
}