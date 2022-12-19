import { Router } from "express";
import {
  createReviewHandler,
  getProductReviewsHandler
} from "../controller/review.controller";
import validateResource from "../middleware/validateResource";
import { createReviewSchema } from "../schema/review.schema";
export const reviewRouter = Router();

reviewRouter.post(
  "/:productId/:userId",
  validateResource(createReviewSchema),
  createReviewHandler
);

reviewRouter.get("/:productId", getProductReviewsHandler);
