import { literal, number, object, string, TypeOf } from "zod";
import { coreProductSchema } from "./core.product.schema";

export const createGamingSchema = {
  ...coreProductSchema,
  type: literal("gaming", { required_error: "Type is required" }),
  specs: object({})
};
export const createConsoleSchema = object({
  body: object({
    subtype: literal("console"),
    ...createGamingSchema,
    model: string(),
    capacity: number(),
    resolution: string() // // horizontal resolution, e.g. 1080HD or 4K
  })
});

export const createGameSchema = object({
  body: object({
    subtype: literal("game"),
    ...createGamingSchema,
    platform: string(),
    genre: string(),
    locale: string(),
    esrb: number()
  })
});

export type CreateConsoleInput = TypeOf<typeof createConsoleSchema>["body"];
export type CreateGameInput = TypeOf<typeof createGameSchema>["body"];
