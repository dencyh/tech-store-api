import { object, string, TypeOf } from "zod";

export const createCategorySchema = object({
  body: object({
    name: string({ required_error: "Category name is required" }),
    type: string({ required_error: "Category type is required" })
  })
});

export type createCategoryInput = TypeOf<typeof createCategorySchema>["body"];
