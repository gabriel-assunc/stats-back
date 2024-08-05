import { Request, Response } from "express";
import { ListSeasons } from "../../Service/Competition/ListSeasons";

export class ListSeasonsController {
    private service: ListSeasons;

    constructor(service: ListSeasons) {
        this.service = service
    }

    async handle(req: Request, res: Response) {
        const { categoryUrl } = req.params
        const seasons = await this.service.execute(categoryUrl)

        return res.status(200).json(seasons)
    }
}