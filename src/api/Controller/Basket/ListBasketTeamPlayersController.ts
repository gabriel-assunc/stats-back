import { Request, Response } from "express";
import { ListBasketTeamPlayers } from "../../Service/Basket/ListBasketTeamPlayers";

export class ListBasketTeamPlayersController {
    private service: ListBasketTeamPlayers;

    constructor(service: ListBasketTeamPlayers) {
        this.service = service
    }

    async handle(req: Request, res: Response) {
        const { teamId } = req.params

        const players = await this.service.execute(teamId);

        return res.status(200).json(players)
    }
}