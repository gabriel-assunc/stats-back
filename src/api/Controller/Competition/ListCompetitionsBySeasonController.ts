import { Request, Response } from "express";
import { ListCompetitionsBySeason } from "../../Service/Competition/ListCompetitionsBySeason";

export class ListCompetitionsBySeasonController {
    private service: ListCompetitionsBySeason;

    constructor(service: ListCompetitionsBySeason) {
        this.service = service
    }

    async handle(req: Request, res: Response) {
        const { season, categoryUrl } = req.params;

        const competitions = await this.service.execute(season, categoryUrl);

        return res.status(200).json(competitions)
    }
}