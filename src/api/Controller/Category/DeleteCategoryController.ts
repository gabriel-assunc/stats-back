import { Request, Response } from "express"
import { DeleteCategories } from "../../Service/Category/DeleteCategories"

export class DeleteCategoryController {
    private service: DeleteCategories

    constructor(service: DeleteCategories) {
        this.service = service
    }

    async handle(req: Request, res: Response) {
        const { id } = req.body
        await this.service.execute(id)

        return res.status(200).send()
    }
}