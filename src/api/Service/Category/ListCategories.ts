import { CategoryRepository } from "../../Repositories/CategoryRepository";

export class ListCategories {
    private repository: CategoryRepository;

    constructor(repository: CategoryRepository) {
        this.repository = repository;
    }

    async execute() {
        return await this.repository.list();
    }
}