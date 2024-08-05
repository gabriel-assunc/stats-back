import { Router } from "express";
import { PrismaTeamRepository } from "../../Repositories/Prisma/PrismaTeamRepository";
import { UpdateTeamsController } from "../../Controller/Basket/UpdateTeamsController";
import { UpdateTeamsService } from "../../Service/Basket/UpdateTeamsService";
import { LolScrap } from "../../Entities/Scraper/Team/LolScrap/LolScrap";
import {
    LIST_LOL_STATS,
    UPDATE_LOL_PLAYERS_STATS,
    UPDATE_LOL_WITH_COMPETITION
} from "../../Endpoints/endpoints";
import { PrismaCompetitionRepository } from "../../Repositories/Prisma/PrismaCompetitionRepository";
import { UpdateTeamStatsLolController } from "../../Controller/Lol/UpdateTeamStatsLolController";
import { UpdateTeamStatsLolService } from "../../Service/Lol/UpdateTeamStatsLolService";
import { PrismaLolStatsrepository } from "../../Repositories/Prisma/PrismaLolStatsRepository";
import { ListLolTeamStatsController } from "../../Controller/Lol/ListLolTeamStatsController";
import { ListLolTeamStats } from "../../Service/Lol/ListLolTeamStats";

interface LolRouterControllers {
    updateTeamsController: UpdateTeamsController,
    updateTeamStatsLolController: UpdateTeamStatsLolController,
    listLolTeamStatsController: ListLolTeamStatsController,
}

export class LolRouter {
    private controller: LolRouterControllers
    constructor() {
        const prismaTeamRepository = new PrismaTeamRepository();
        const prismaLolStatsRepository = new PrismaLolStatsrepository();
        const prismaCompetitionRepository = new PrismaCompetitionRepository();

        const lolScrap = new LolScrap()

        const updateTeams = new UpdateTeamsService(prismaTeamRepository, prismaCompetitionRepository, lolScrap);
        const updateTeamStats = new UpdateTeamStatsLolService(prismaLolStatsRepository, prismaTeamRepository, lolScrap)
        const listLolTeamStats = new ListLolTeamStats(prismaLolStatsRepository)

        const updateTeamsController = new UpdateTeamsController(updateTeams);
        const updateTeamStatsLolController = new UpdateTeamStatsLolController(updateTeamStats);
        const listLolTeamStatsController = new ListLolTeamStatsController(listLolTeamStats)

        this.controller = {
            updateTeamsController,
            updateTeamStatsLolController,
            listLolTeamStatsController,
        }
    }

    setRouter(router: Router) {
        const {
            updateTeamsController,
            updateTeamStatsLolController,
            listLolTeamStatsController,
        } = this.controller

        router.get(UPDATE_LOL_WITH_COMPETITION, (req, res) => updateTeamsController.handle(req, res))
        router.get(UPDATE_LOL_PLAYERS_STATS, (req, res) => updateTeamStatsLolController.handle(req, res))
        router.get(LIST_LOL_STATS, (req, res) => listLolTeamStatsController.handle(req, res))
    }
}