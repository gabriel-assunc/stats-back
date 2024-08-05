import { CategoryRepository } from "../../Repositories/CategoryRepository";

export class DeleteCategories {
    private repository: CategoryRepository

    constructor(repository: CategoryRepository) {
        this.repository = repository;
    }

    async execute(id: string[]) {
        await this.repository.delete(id);
    }
}