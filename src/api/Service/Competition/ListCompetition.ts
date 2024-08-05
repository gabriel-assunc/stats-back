import { CompetitionRepository } from "../../Repositories/CompetitionRepository";

export class ListCompetition {
    private repository: CompetitionRepository

    constructor(repository: CompetitionRepository) {
        this.repository = repository
    }

    async execute(categoryUrl: string) {
        const competitions = await this.repository.listCompetition('/'+categoryUrl)
        return competitions
    }
}