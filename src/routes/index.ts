import { cartRouter } from "./cart.routes";
import { Router } from "express";
import { brandRouter } from "./brand.routes";
import { categoryRouter } from "./category.routes";
import { productRouter } from "./product.routes";
import { authRouter } from "./session.routes";
import { userRouter } from "./user.routes";

const rootRouter = Router();

rootRouter.get("/healthcheck", (_, res) => res.sendStatus(200));

rootRouter.use("/users", userRouter);
rootRouter.use("/sessions", authRouter);
rootRouter.use("/categories", categoryRouter);
rootRouter.use("/products", productRouter);
rootRouter.use("/brands", brandRouter);
rootRouter.use("/cart", cartRouter);

export default rootRouter;
