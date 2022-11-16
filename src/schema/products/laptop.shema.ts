import { literal, number, object, string, tuple, TypeOf } from "zod";
import { createProductSchema } from "./core.product.schema";

export const createLaptopSchema = object({
  body: object({
    ...createProductSchema,
    type: literal("laptop", { required_error: "Type is required" }),
    os: string({ required_error: "OS is required" }),
    screenSize: number({ required_error: "Screen size is required" }),
    resolution: tuple([number(), number()], {
      required_error: "Resolution must have 2 values"
    }),
    refreshRate: number({ required_error: "Refresh rate is required" }),
    cpu: string({ required_error: "CPU name is required" }),
    cpuCores: number({ required_error: "CPU cores is required" }),
    ram: number({ required_error: "RAM value is required" }),
    capacity: number({ required_error: "Capacity is required" }),
    batteryLife: number({ required_error: "Battery life is required" })
  })
});

export type createLaptopInput = TypeOf<typeof createLaptopSchema>["body"];
