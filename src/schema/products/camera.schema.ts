import {
  array,
  literal,
  number,
  object,
  string,
  tuple,
  TypeOf,
  union
} from "zod";
import { coreProductSchema } from "./core.product.schema";

export const createPhoneSchema = object({
  body: object({
    ...coreProductSchema,
    type: literal("cameras", { required_error: "Type is required" }),
    specs: object({
      lensMount: string(),
      sensorSize: string(),
      stillResolution: number(), // in megapixels
      videoResolution: string(), // horizontal resolution, e.g. 1080HD or 4K
      videoCodecs: array(string()),
      frameRate: string(),
      stabilization: string()
    })
  })
});

export type createPhoneInput = TypeOf<typeof createPhoneSchema>["body"];
