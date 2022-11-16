import { object, string, TypeOf } from "zod";

export const createBrandSchema = object({
  body: object({
    name: string({ required_error: "Brand name is required" })
  })
});

export type createBrandInput = TypeOf<typeof createBrandSchema>["body"];
