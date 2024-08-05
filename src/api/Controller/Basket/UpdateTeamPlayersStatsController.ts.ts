import { Request, Response } from "express";
import { UpdateTeamPlayersStats } from "../../Service/Basket/UpdateTeamPlayersStats";

export class UpdateTeamPlayersStatsController {
    private service: UpdateTeamPlayersStats;

    constructor(service: UpdateTeamPlayersStats) {
        this.service = service
    }

    async handle(req: Request, res: Response) {
        const { teamId } = req.params

        const data = await this.service.execute(teamId)
        const status = data ? 200 : 204
        return res.status(status).send();
    }
}