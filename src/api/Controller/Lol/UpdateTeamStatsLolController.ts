import { Request, Response } from "express";
import { UpdateTeamStatsLolService } from "../../Service/Lol/UpdateTeamStatsLolService";


export class UpdateTeamStatsLolController {
    private service: UpdateTeamStatsLolService;

    constructor(service: UpdateTeamStatsLolService) {
        this.service = service
    }

    async handle(req: Request, res: Response) {
        const { teamId } = req.params;

        const status = await this.service.execute(teamId)

        return res.status(status ? 200 : 404).send()
    }
}