import { CompetitionRepository } from "../../Repositories/CompetitionRepository";

export class ListSeasons {
    private repository: CompetitionRepository;

    constructor(repository: CompetitionRepository) {
        this.repository = repository
    }

    async execute(categoryUrl: string) {
        const seasons = await this.repository.getSeasons('/' + categoryUrl)

        return seasons
    }
}