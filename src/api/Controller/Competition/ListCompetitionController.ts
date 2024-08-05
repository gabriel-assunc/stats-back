import { Request, Response } from "express"
import { ListCompetition } from "../../Service/Competition/ListCompetition"

export class ListCompetitionController {
    private service: ListCompetition

    constructor(service: ListCompetition) {
        this.service = service
    }

    async handle(req: Request, res: Response) {
        const { categoryUrl } = req.params
        const competitions = await this.service.execute(categoryUrl)

        return res.status(200).json(competitions)
    }
}