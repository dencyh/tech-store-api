import { literal, number, object, string, tuple, TypeOf, union } from "zod";
import { createProductSchema } from "./core.product.schema";

export const createPhoneSchema = object({
  body: object({
    ...createProductSchema,
    type: literal("phone", { required_error: "Type is required" }),
    specs: object({
      os: string({ required_error: "OS is required" }),
      screenSize: number({ required_error: "Screensize is required" }),
      resolution: tuple([number(), number()], {
        required_error: "Resolution must have 2 values"
      }),
      refreshRate: number({ required_error: "refreshRate is required" }),
      cpu: string({ required_error: "CPU name is required" }),
      ram: number({ required_error: "Ram value is required" }),
      capacity: number({ required_error: "Capacity is required" }),
      cellularNetwork: string({
        required_error: "Supporting newtowork is required"
      }),
      simCount: number({ required_error: "SIM count is required" }),
      batteryLife: number({ required_error: "Battery life is required" }),
      biometrics: union([literal("faceId"), literal("touchId")]).array()
    })
  })
});

export type createPhoneInput = TypeOf<typeof createPhoneSchema>["body"];
