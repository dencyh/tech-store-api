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
  console.log(review);
  return ReviewModel.create({
    user: userId,
    product: productId,
    score,
    review
  });
}

export async function findReview(
  query: FilterQuery<ReviewDocument>
  // options: QueryOptions = { lean: true }
) {
  return ReviewModel.findOne(query);
}
