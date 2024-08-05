import { CompetitionRepository } from "../../Repositories/CompetitionRepository";


export class ListCompetitionsBySeason {
    private repository: CompetitionRepository;

    constructor(repository: CompetitionRepository) {
        this.repository = repository;
    }

    async execute(season: string, categoryUrl: string) {
        const categoryWithBars = "/" + categoryUrl
        const competitions = await this.repository.getCompetitionBySeason(season, categoryWithBars)

        return competitions
    }
}