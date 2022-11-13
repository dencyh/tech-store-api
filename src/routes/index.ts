import { Router } from "express";
import { authRouter } from "./session.routes";
import { userRouter } from "./user.routes";

const rootRouter = Router();

rootRouter.get("/healthcheck", (_, res) => res.sendStatus(200));

rootRouter.use("/users", userRouter);
rootRouter.use("/sessions", authRouter);

export default rootRouter;
