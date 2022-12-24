import { FilterQuery, QueryOptions } from "mongoose";
import ReviewModel, { ReviewDocument } from "../model/review.model";

export async function createReview({
  userId,
  productId,
  score,
  review
}: {
  userId: string;
  productId: string;
  score: number;
  review?:
    | {
        advantages: string;
        disadvantages: string;
        comment: string;
      }
    | undefined;
}) {
  return ReviewModel.create({
    user: userId,
    product: productId,
    score,
    review
  });
}

export function findReview(query: FilterQuery<ReviewDocument>) {
  return ReviewModel.findOne(query);
}

export function findProductReviews(query: FilterQuery<ReviewDocument>) {
  return ReviewModel.find(query).populate("user");
}

export function findReviewsByProductIds(query: FilterQuery<ReviewDocument>) {
  return ReviewModel.find(query);
}
