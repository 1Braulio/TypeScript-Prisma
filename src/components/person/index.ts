import { Router } from "express";
import { findAll, store, login } from "./controller";

const personRouter: Router = Router();

personRouter.get("/", findAll);
personRouter.get("/:id", findAll);
personRouter.post("/", store);
personRouter.post("/login", login);

export default personRouter;