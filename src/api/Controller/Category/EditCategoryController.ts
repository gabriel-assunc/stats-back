import { Request, Response } from "express"
import { Category } from "../../Entities/Category";
import { EditCategory } from "../../Service/Category/EditCategory";

export class EditCategoryController {
    private service: EditCategory

    constructor(service: EditCategory) {
        this.service = service
    }

    async handle(req: Request, res: Response) {
        const { id, name, icon } = req.body;
        const categoryToEdit = new Category({ id, name, icon })

        await this.service.execute(categoryToEdit)
        return res.status(200).send()
    }
}