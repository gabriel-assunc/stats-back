import { db } from "../../../config/db.server";
import { Category } from "../../Entities/Category";
import { CategorySchema } from "../../Interfaces/CategorySchema";

export class PrismaCategoryRepository implements PrismaCategoryRepository {

    isValidData(data: Category) {
        return CategorySchema.safeParse(data.toObject()).success
    }

    async create(data: Category): Promise<void> {
        const { name, icon } = data
        
        if (this.isValidData(data))
            await db.category.create({
                data: { name, icon }
            })
    }

    async edit(data: Category): Promise<void> {
        const { id, name, icon } = data
        if (this.isValidData(data))
            await db.category.update({
                data: {
                    name, icon
                },
                where: {
                    id
                }
            })
    }

    async list(): Promise<[] | Category[]> {
        const categories = await db.category.findMany() as Category[]

        return categories
    }

    async delete(idToDelete: string[]): Promise<void> {
        await db.category.deleteMany({
            where: {
                id: {
                    in: idToDelete
                }
            }
        })
    }

}