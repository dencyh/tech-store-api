import { Request, Response } from "express";

import { findBrandByName } from "../services/brand.service";
import { findCategoryByType } from "../services/category.service";
import logger from "../utils/logger";
import { updateSpecs } from "../services/specs.service";
import { CreateReviewInput } from "../schema/review.schema";
import {
  createReview,
  findProductReviews,
  findReview
} from "../services/review.service";

export async function createReviewHandler(
  req: Request<CreateReviewInput["params"], {}, CreateReviewInput["body"]>,
  res: Response
) {
  try {
    const { productId, userId } = req.params;
    const { score, review } = req.body;

    const reviewExists = await findReview({ user: userId, product: productId });

    if (reviewExists) {
      return res
        .status(409)
        .send(
          `User ${userId} have already submitted a review for product ${productId}`
        );
    }

    const newReview = await createReview({ userId, productId, score, review });
    console.log(newReview);

    return res.json(newReview);
  } catch (e: any) {
    logger.error(e);
    return res.status(500).send(e);
  }
}

export async function getProductReviewsHandler(
  req: Request<{ productId: string }>,
  res: Response
) {
  try {
    const { productId } = req.params;

    const reviews = await findProductReviews({ product: productId });

    return res.json(reviews);
  } catch (e) {
    logger.error(e);
    return res.status(500).send(e);
  }
}
