import { reviewRouter } from "./review.routes";
import { cartRouter } from "./cart.routes";
import { Router } from "express";
import { brandRouter } from "./brand.routes";
import { categoryRouter } from "./category.routes";
import { productRouter } from "./product.routes";
import { authRouter } from "./session.routes";
import { userRouter } from "./user.routes";
import { bookmarkRouter } from "./bookmark.routes";
import { specsRouter } from "./specs.routes";
import { addressRouter } from "./address.routes";

const rootRouter = Router();

rootRouter.get("/healthcheck", (_, res) => res.sendStatus(200));

rootRouter.use("/users", userRouter);
rootRouter.use("/sessions", authRouter);
rootRouter.use("/categories", categoryRouter);
rootRouter.use("/products", productRouter);
rootRouter.use("/brands", brandRouter);
rootRouter.use("/cart", cartRouter);
rootRouter.use("/bookmarks", bookmarkRouter);
rootRouter.use("/specs", specsRouter);
rootRouter.use("/reviews", reviewRouter);
rootRouter.use("/address", addressRouter);

export default rootRouter;
