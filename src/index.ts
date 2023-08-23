import express, { Request, Response, NextFunction, Errback } from "express";

import authRoute from "./routes/auth";
import { errorHandler } from "./utils/errorHandler";

const app = express();

app.use(express.json());

app.use("/api/users", authRoute);

app.use(errorHandler);

export default app;
