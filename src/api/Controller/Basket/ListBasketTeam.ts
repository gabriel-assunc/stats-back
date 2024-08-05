import { Request, Response } from "express"
import { ListBasketTeam } from "../../Service/Basket/ListBasketTeam";

export class ListBasketTeamController {
    private service: ListBasketTeam

    constructor(service: ListBasketTeam) {
        this.service = service
    }

    async handle(req: Request, res: Response) {
        const { competitionId, categoryUrl } = req.params
        
        const teams = await this.service.execute(categoryUrl, competitionId);
        return res.status(200).json(teams)
    }
}