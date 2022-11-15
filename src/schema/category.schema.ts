import { object, string, TypeOf } from "zod";

export const createCategorySchema = object({
  body: object({
    title: string({ required_error: "Category title is required" }),
    image: string({ required_error: "Category image is required" })
  })
});

export type createCategoryInput = TypeOf<typeof createCategorySchema>["body"];
