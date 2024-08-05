import { CompetitionAction } from "../../Entities/Scraper/Competition/CompetitionAction";
import { CompetitionRepository } from "../../Repositories/CompetitionRepository";

export class UpdateCompetition {
    private repository: CompetitionRepository;
    private competitionAction: CompetitionAction;

    constructor(repository: CompetitionRepository, competitionAction: CompetitionAction) {
        this.repository = repository
        this.competitionAction = competitionAction
    }

    async execute() {
        const { categoryUrl, competitions } = await this.competitionAction.getCompetition()
        for (let i in competitions) await this.repository.addCompetition(categoryUrl, competitions[i])
        return competitions.length > 0
    }
}