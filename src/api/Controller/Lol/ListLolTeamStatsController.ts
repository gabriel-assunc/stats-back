import { Request, Response } from "express";
import { ListLolTeamStats } from "../../Service/Lol/ListLolTeamStats";

export class ListLolTeamStatsController {
    private service: ListLolTeamStats;

    constructor(service: ListLolTeamStats) {
        this.service = service
    }

    async handle(req: Request, res: Response) {
        const { teamId } = req.params

        const teamStat = await this.service.execute(teamId)
        return res.status(200).json(teamStat)
    }
}