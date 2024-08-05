import { Request, Response } from "express";
import { UpdateTeamsService } from "../../Service/Basket/UpdateTeamsService";

export class UpdateTeamsController {
    private service: UpdateTeamsService;

    constructor(service: UpdateTeamsService) {
        this.service = service
    }

    async handle(req: Request, res: Response) {
        const { competitionId } = req.params

        const data = await this.service.execute(competitionId);
        const status = data ? 200 : 204
        return res.status(status).send()
    }
}