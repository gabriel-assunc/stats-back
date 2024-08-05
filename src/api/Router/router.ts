import { Router } from "express";
import { CategoryRoute } from "./Routes/Category";
import { BasketRouter } from "./Routes/Basket";
import { LolRouter } from "./Routes/Lol";
import { CompetitionRouter } from "./Routes/Competition";

const router = Router();
const categoryRoute = new CategoryRoute();
const competitionRouter = new CompetitionRouter();
const basketRoute = new BasketRouter();
const lolRouter = new LolRouter();

categoryRoute.setRoute(router);
competitionRouter.setRouter(router);
basketRoute.setRouter(router);
lolRouter.setRouter(router);

export { router };
