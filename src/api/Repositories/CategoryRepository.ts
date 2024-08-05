import { Category } from "../Entities/Category"

export interface CategoryRepository {
    create(data: Category): Promise<void>
    edit(data: Category): Promise<void>
    list(): Promise<Category[] | []>
    delete(id: string[]): Promise<void>
}