import express, { type Application } from "express";
import * as ROUTER from "./components";
// import connect from "./datasource";

const app: Application = express();

// connect().catch((error) => console.log(`error database mongo: ${error}`));

app.use(express.json());

app.use("/api/v1/persons", ROUTER.personRouter);
app.use("/api/v1/playlists", ROUTER.playlistRouter);
app.use("/api/v1/songs", ROUTER.songRouter);

export default app;
