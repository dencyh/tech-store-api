import { number, object, string, TypeOf, z } from "zod";

export const createReviewSchema = object({
  params: object({
    productId: string({
      required_error: "User id is required"
    }).min(1),
    userId: string({
      required_error: "User id is required"
    }).min(1)
  }),
  body: object({
    score: number().gte(1).lte(5).int(),
    review: object({
      advantages: string(),
      disadvantages: string(),
      comment: string()
    })
  })
});

export type CreateReviewInput = TypeOf<typeof createReviewSchema>;
