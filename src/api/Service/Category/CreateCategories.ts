import { Category } from "../../Entities/Category"
import { CategoryRepository } from "../../Repositories/CategoryRepository"

export class CreateCategories {
    private categoryRepository: CategoryRepository

    constructor(categoryRepository: CategoryRepository) {
        this.categoryRepository = categoryRepository
    }

    async execute(categoryData: Category) {
        await this.categoryRepository.create(categoryData)
    }
}