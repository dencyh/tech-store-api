import { literal, object, string, TypeOf } from "zod";
import { coreProductSchema } from "./core.product.schema";

export const createSmartHomeSchema = object({
  body: object({
    ...coreProductSchema,
    type: literal("smartphones", { required_error: "Type is required" }),
    specs: object({
      subtype: string()
    })
  })
});

export type CreateSmartHomeInput = TypeOf<typeof createSmartHomeSchema>["body"];
