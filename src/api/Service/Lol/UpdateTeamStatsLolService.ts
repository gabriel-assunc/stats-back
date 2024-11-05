import { lolStat } from "../../Entities/lolStats";
import { ScraperAction } from "../../Entities/Scraper/Team/ScrapAction";
import { LolStatsRepository } from "../../Repositories/LolStatsRepository";
import { TeamRepository } from "../../Repositories/TeamRepository";

interface updateTeamStatsProps {
    teamStat: {
        name: string,
        stats: lolStat[]
    },
    competitionId: string,
}

export class UpdateTeamStatsLolService {
    private teamRepository: TeamRepository;
    private statsRepository: LolStatsRepository;
    private lolScraper: ScraperAction;

    constructor(statsRepository: LolStatsRepository, teamRepository: TeamRepository, lolScraper: ScraperAction) {
        this.statsRepository = statsRepository;
        this.teamRepository = teamRepository;
        this.lolScraper = lolScraper;
    }

    async updateTeamStats({ competitionId, teamStat: { name, stats } }: updateTeamStatsProps) {
        if (stats.length === 0) return;
        await this.statsRepository.deleteStats(stats)
        await this.statsRepository.addStat(name, competitionId, stats)
    }

    async execute(teamId: string) {
        const { name, Competition } = await this.teamRepository.getTeam(teamId)
        const { name: competitionName, id: competitionId = '' } = Competition

        const teamStats = await this.lolScraper.updateTeamStats(name, competitionName)
        teamStats.forEach(async (teamStat) => await this.updateTeamStats({ competitionId, teamStat }))

        return teamStats.length > 0
    }
}