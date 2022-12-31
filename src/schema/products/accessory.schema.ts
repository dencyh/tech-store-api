import { literal, object, string, TypeOf } from "zod";
import { coreProductSchema } from "./core.product.schema";

export const createAccessorySchema = object({
  body: object({
    ...coreProductSchema,
    type: literal("accessories", { required_error: "Type is required" }),
    specs: object({
      subtype: string()
    })
  })
});

export type CreateAccessoryInput = TypeOf<typeof createAccessorySchema>["body"];
