import { literal, number, object, string, TypeOf } from "zod";
import { coreProductSchema } from "./core.product.schema";

export const createWatchSchema = object({
  body: object({
    ...coreProductSchema,
    type: literal("watches", { required_error: "Type is required" }),
    specs: object({
      osCompatibility: string(),
      cellularNetwork: string({
        required_error: "Supporting network is required"
      }),
      batteryLife: number({ required_error: "Battery life is required" })
    })
  })
});

export type CreateWatchInput = TypeOf<typeof createWatchSchema>["body"];
