import { Router } from "express";
import { PrismaCompetitionRepository } from "../../Repositories/Prisma/PrismaCompetitionRepository";
import { BasketCompetition } from "../../Entities/Scraper/Competition/Basket/BasketCompetition";
import { UpdateCompetition } from "../../Service/Competition/UpdateCompetition";
import { UpdateCompetitionController } from "../../Controller/Competition/UpdateCompetitionController";
import {
    COMPETITION_UPDATE_BASKET,
    COMPETITION_UPDATE_LOL,
    LIST_COMPETITION_BY_CATEGORY,
    LIST_SEASON, LIST_SEASON_BY_CATEGORY
} from "../../Endpoints/endpoints";
import { ListCompetitionController } from "../../Controller/Competition/ListCompetitionController";
import { ListCompetition } from "../../Service/Competition/ListCompetition";
import { LolCompetition } from "../../Entities/Scraper/Competition/Lol/LolCompetition";
import { ListSeasonsController } from "../../Controller/Competition/ListSeasonsController";
import { ListSeasons } from "../../Service/Competition/ListSeasons";
import { ListCompetitionsBySeasonController } from "../../Controller/Competition/ListCompetitionsBySeasonController";
import { ListCompetitionsBySeason } from "../../Service/Competition/ListCompetitionsBySeason";

interface CompetitionController {
    updateBasketCompetitionController: UpdateCompetitionController,
    updateLolCompetitionController: UpdateCompetitionController,
    listSeasonsController: ListSeasonsController,
    listCompetitionsBySeason: ListCompetitionsBySeasonController,
    listCompetitionController: ListCompetitionController,
}

export class CompetitionRouter {
    private controller: CompetitionController;

    constructor() {
        const prismaCompetitionRepository = new PrismaCompetitionRepository();

        const competitionBasketAction = new BasketCompetition();
        const competitionLolAction = new LolCompetition();

        const updateBasketCompetition = new UpdateCompetition(prismaCompetitionRepository, competitionBasketAction);
        const updateLolCompetition = new UpdateCompetition(prismaCompetitionRepository, competitionLolAction);
        const listCompetition = new ListCompetition(prismaCompetitionRepository);
        const listCompetitionBySeason = new ListCompetitionsBySeason(prismaCompetitionRepository);
        const listSeasons = new ListSeasons(prismaCompetitionRepository);

        const updateBasketCompetitionController = new UpdateCompetitionController(updateBasketCompetition);
        const updateLolCompetitionController = new UpdateCompetitionController(updateLolCompetition);
        const listCompetitionController = new ListCompetitionController(listCompetition);
        const listCompetitionsBySeason = new ListCompetitionsBySeasonController(listCompetitionBySeason);
        const listSeasonsController = new ListSeasonsController(listSeasons)

        this.controller = {
            updateBasketCompetitionController,
            updateLolCompetitionController,
            listSeasonsController,
            listCompetitionsBySeason,
            listCompetitionController
        }
    }

    setRouter(router: Router) {
        const {
            updateBasketCompetitionController,
            updateLolCompetitionController,
            listSeasonsController,
            listCompetitionsBySeason,
            listCompetitionController
        } = this.controller

        router.get(COMPETITION_UPDATE_BASKET, (req, res) => updateBasketCompetitionController.handle(req, res))
        router.get(COMPETITION_UPDATE_LOL, (req, res) => updateLolCompetitionController.handle(req, res))
        router.get(LIST_SEASON, (req, res) => listSeasonsController.handle(req, res))
        router.get(LIST_SEASON_BY_CATEGORY, (req, res) => listCompetitionsBySeason.handle(req, res))
        router.get(LIST_COMPETITION_BY_CATEGORY, (req, res) => listCompetitionController.handle(req, res))
    }
}