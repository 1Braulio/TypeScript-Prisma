import { Router } from "express";
import { find, findlogged, store } from "./controller";
import { auth } from "./middleware";

const songRouter: Router = Router();

songRouter.get("/logged/", auth, findlogged);
songRouter.get("/logged/:id", auth, findlogged);
songRouter.get("/", find);
songRouter.get("/:id", find);
songRouter.post("/", store);

export default songRouter;