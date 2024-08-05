import { ScraperAction } from "../../Entities/Scraper/Team/ScrapAction";
import { LolStatsRepository } from "../../Repositories/LolStatsRepository";
import { TeamRepository } from "../../Repositories/TeamRepository";

export class UpdateTeamStatsLolService {
    private teamRepository: TeamRepository;
    private statsRepository: LolStatsRepository;
    private lolScraper: ScraperAction;

    constructor(statsRepository: LolStatsRepository, teamRepository: TeamRepository, lolScraper: ScraperAction) {
        this.statsRepository = statsRepository;
        this.teamRepository = teamRepository;
        this.lolScraper = lolScraper;
    }

    async execute(teamId: string) {
        const { name, Competition } = await this.teamRepository.getTeam(teamId)
        const { stats } = (await this.lolScraper.updateTeamStats(name, Competition.name))[0]
        if (stats.length > 0) await this.statsRepository.deleteStats(teamId)
        await this.statsRepository.addStat(teamId, stats)
        return stats.length > 0
    }
}