import { Category } from "../../Entities/Category";
import { CategoryRepository } from "../../Repositories/CategoryRepository";

export class EditCategory {
    private repository: CategoryRepository

    constructor(repository: CategoryRepository) {
        this.repository = repository
    }

    async execute(categoryToEdit: Category) {
        await this.repository.edit(categoryToEdit)
    }
}