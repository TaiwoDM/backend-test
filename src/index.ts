import express, { Request, Response, NextFunction, Errback } from "express";

import authRoute from "./routes/auth";
import videosRoute from "./routes/files"
// import router from "./routes/video";
import { errorHandler } from "./utils/errorHandler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
})
);

app.use("/api/users", authRoute);
app.use("/api/files", videosRoute);

app.use(errorHandler);

export default app;
