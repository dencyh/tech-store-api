import { array, literal, number, object, string, TypeOf } from "zod";
import { coreProductSchema } from "./core.product.schema";

export const createDroneSchema = object({
  body: object({
    ...coreProductSchema,
    type: literal("drones", { required_error: "Type is required" }),
    specs: object({
      subtype: string(),
      stillResolution: number(), // in megapixels
      videoResolution: string(), // horizontal resolution, e.g. 1080HD or 4K
      videoCodecs: array(string()),
      frameRate: string(),
      stabilization: string()
    })
  })
});

export type CreateDroneInput = TypeOf<typeof createDroneSchema>["body"];
