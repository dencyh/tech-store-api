import { CreateProductInput } from "./products/core.product.schema";
import { array, object, string, TypeOf, z } from "zod";

const availableTypes = z.enum([
  "smartphones",
  "laptops",
  "tablets",
  "headphones"
]);

export const createBrandSchema = object({
  body: object({
    name: string({ required_error: "Brand name is required" }),
    types: array(availableTypes)
  })
});

export type createBrandInput = TypeOf<typeof createBrandSchema>["body"];
