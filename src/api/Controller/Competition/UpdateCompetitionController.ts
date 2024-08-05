import { Request, Response } from "express"
import { UpdateCompetition } from "../../Service/Competition/UpdateCompetition";

export class UpdateCompetitionController {
    private service: UpdateCompetition

    constructor(service: UpdateCompetition) {
        this.service = service
    }

    async handle(req: Request, res: Response) {
        const data = await this.service.execute();
        const status = data ? 200 : 204
        return res.status(status).send()
    }
}