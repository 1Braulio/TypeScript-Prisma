import { Router } from "express";
import { findAll, store, addSong } from "./controller";

const playlistRouter: Router = Router();

playlistRouter.get("/", findAll);
playlistRouter.post("/", store);
playlistRouter.post("/addsong", addSong);

export default playlistRouter;