import { object, string, TypeOf } from "zod";

export const createTypeSchema = object({
  body: object({
    name: string({ required_error: "Type name is required" })
  })
});

export type createTypeInput = TypeOf<typeof createTypeSchema>["body"];
