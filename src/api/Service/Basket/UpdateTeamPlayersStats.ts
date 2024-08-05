import { ScraperAction } from "../../Entities/Scraper/Team/ScrapAction";
import { StatsRepository } from "../../Repositories/BasketStatsRpository";
import { TeamRepository } from "../../Repositories/TeamRepository";


export class UpdateTeamPlayersStats {
    private repository: TeamRepository;
    private scrapAction: ScraperAction;
    private statsRepository: StatsRepository;

    constructor(repository: TeamRepository, statsRepository: StatsRepository, scrapAction: ScraperAction) {
        this.repository = repository;
        this.scrapAction = scrapAction;
        this.statsRepository = statsRepository;
    }

    async execute(teamId: string) {
        const { name, Competition } = await this.repository.getTeam(teamId);
        const players = await this.scrapAction.updateTeamStats(name, Competition.name)

        for (let p in players) {
            await this.statsRepository.deleteStatsPlayers(players[p].name)
            for (let s in players[p].stats) {
                await this.statsRepository.addStat(teamId, players[p].name, players[p].stats[s])
            }
        }

        return !!players
    }
}