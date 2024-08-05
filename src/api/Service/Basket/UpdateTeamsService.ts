import { ScraperAction } from "../../Entities/Scraper/Team/ScrapAction";
import { CompetitionRepository } from "../../Repositories/CompetitionRepository";
import { TeamRepository } from "../../Repositories/TeamRepository";

export class UpdateTeamsService {
    private competitionRepository: CompetitionRepository;
    private repository: TeamRepository;
    private scrapAction: ScraperAction;

    constructor(repository: TeamRepository, competitionRepository: CompetitionRepository, scrapAction: ScraperAction) {
        this.competitionRepository = competitionRepository
        this.repository = repository
        this.scrapAction = scrapAction
    }

    async execute(competitionId: string) {
        const competitionName = (await this.competitionRepository.getCompetitionById(competitionId)).name

        const { url, teamName } = await this.scrapAction.updateTeams(competitionName)

        return this.repository.addTeamName(url, competitionId, teamName).then(() => teamName.length > 0)
    }
}