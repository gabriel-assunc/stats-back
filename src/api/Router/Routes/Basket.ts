import { Router } from "express";
import { UpdateTeamsController } from "../../Controller/Basket/UpdateTeamsController";
import { PrismaTeamRepository } from "../../Repositories/Prisma/PrismaTeamRepository";
import { UpdateTeamsService } from "../../Service/Basket/UpdateTeamsService";
import BasketAction from "../../Entities/Scraper/Team/Basket/BasketScrap";
import { ListBasketTeam } from "../../Service/Basket/ListBasketTeam";
import { ListBasketTeamController } from "../../Controller/Basket/ListBasketTeam";
import { UpdateTeamPlayersStatsController } from "../../Controller/Basket/UpdateTeamPlayersStatsController.ts";
import { UpdateTeamPlayersStats } from "../../Service/Basket/UpdateTeamPlayersStats";
import { PrismaBasketStatRepository } from "../../Repositories/Prisma/PrismaBasketStatRepository";
import { PrismaPlayerRepository } from "../../Repositories/Prisma/PrismaPlayerRepository";
import { ListBasketTeamPlayers } from "../../Service/Basket/ListBasketTeamPlayers";
import { ListBasketTeamPlayersController } from "../../Controller/Basket/ListBasketTeamPlayersController";
import {
    LIST_BASKET_PLAYERS,
    LIST_COMPETITION,
    UPDATE_BASKET_PLAYERS_STATS,
    UPDATE_BASKET_WITH_COMPETITION
} from "../../Endpoints/endpoints";
import { PrismaCompetitionRepository } from "../../Repositories/Prisma/PrismaCompetitionRepository";
import { Stat } from "../../Entities/Stat";

interface BasketRouterController {
    updateTeamsController: UpdateTeamsController,
    listBasketTeamController: ListBasketTeamController,
    updateTeamPlayersStatsController: UpdateTeamPlayersStatsController,
    listBasketTeamPlayersController: ListBasketTeamPlayersController
}

export class BasketRouter {
    private controller: BasketRouterController;

    constructor() {
        const prismaTeamRepository = new PrismaTeamRepository();
        const prismaBasketStatRepository = new PrismaBasketStatRepository();
        const prismaPlayerRepository = new PrismaPlayerRepository<Stat>();
        const prismaCompetitionRepository = new PrismaCompetitionRepository();

        const basketAction = new BasketAction();

        const listTeam = new ListBasketTeam(prismaTeamRepository)
        const updateTeams = new UpdateTeamsService(prismaTeamRepository, prismaCompetitionRepository, basketAction);
        const updateTeamPlayersStats = new UpdateTeamPlayersStats(prismaTeamRepository, prismaBasketStatRepository, basketAction);
        const listPlayerByTeamId = new ListBasketTeamPlayers(prismaPlayerRepository, prismaBasketStatRepository);

        const listBasketTeamController = new ListBasketTeamController(listTeam)
        const updateTeamsController = new UpdateTeamsController(updateTeams);
        const updateTeamPlayersStatsController = new UpdateTeamPlayersStatsController(updateTeamPlayersStats)
        const listBasketTeamPlayersController = new ListBasketTeamPlayersController(listPlayerByTeamId)

        this.controller = {
            updateTeamsController,
            listBasketTeamController,
            updateTeamPlayersStatsController,
            listBasketTeamPlayersController,
        }
    }

    setRouter(router: Router) {
        const {
            updateTeamsController,
            listBasketTeamController,
            updateTeamPlayersStatsController,
            listBasketTeamPlayersController
        } = this.controller

        router.get(LIST_COMPETITION, (req, res) => listBasketTeamController.handle(req, res))
        router.get(UPDATE_BASKET_WITH_COMPETITION, (req, res) => updateTeamsController.handle(req, res))
        router.get(UPDATE_BASKET_PLAYERS_STATS, (req, res) => updateTeamPlayersStatsController.handle(req, res))
        router.get(LIST_BASKET_PLAYERS, (req, res) => listBasketTeamPlayersController.handle(req, res))
    }

}