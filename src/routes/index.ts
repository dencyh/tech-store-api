import { Router } from "express";
import { userRouter } from "./user.routes";

const rootRouter = Router();

rootRouter.get("/healthcheck", (_, res) => res.sendStatus(200));

rootRouter.use("/users", userRouter);

export default rootRouter;
