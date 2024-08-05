import { Request, Response } from "express";
import { CreateCategories } from "../../Service/Category/CreateCategories";
import { Category } from "../../Entities/Category";

export class CreateCategoryController {
    private service: CreateCategories;

    constructor(service: CreateCategories) {
        this.service = service;
    }

    async handle(req: Request, res: Response) {
        const { name, icon } = req.body
        const category = new Category({ name, icon })
        
        await this.service.execute(category)

        return res.status(201).send()
    }
}