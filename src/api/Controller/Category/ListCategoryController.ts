import { Request, Response } from "express";
import { ListCategories } from "../../Service/Category/ListCategories";

export class ListCategoryController {
    private service: ListCategories

    constructor(service: ListCategories) {
        this.service = service;
    }

    async handle(req: Request, res: Response) {
        const categories = await this.service.execute();

        return res.status(200).json(categories)
    }
}