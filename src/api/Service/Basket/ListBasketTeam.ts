import { TeamRepository } from "../../Repositories/TeamRepository";

export class ListBasketTeam {
    private repository: TeamRepository;

    constructor(repository: TeamRepository) {
        this.repository = repository
    }

    async execute(categoryURL: string, competitionId: string) {
        const teams = await this.repository.listTeam(categoryURL, competitionId);

        return teams
    }
}