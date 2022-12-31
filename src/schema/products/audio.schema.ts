import { array, literal, object, string, TypeOf } from "zod";
import { coreProductSchema } from "./core.product.schema";

export const coreAudioSchema = {
  ...coreProductSchema,
  type: literal("audio", { required_error: "Type is required" }),
  color: string()
};

export const createHeadphonesSchema = object({
  body: object({
    ...coreAudioSchema,
    specs: object({
      subtype: literal("headphones"),
      designType: string(),
      connection: string(),
      protection: array(string()).optional(),
      features: array(string()).optional()
    })
  })
});
export const createOtherAudioSchema = object({
  body: object({
    ...coreAudioSchema,
    specs: object({
      subtype: string()
    })
  })
});

export type HeadphonesInput = TypeOf<typeof createHeadphonesSchema>["body"];
export type OtherAudioInput = TypeOf<typeof createOtherAudioSchema>["body"];
