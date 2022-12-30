import { number, object, string, tuple, TypeOf } from "zod";

export const createAddressSchema = object({
  body: object({
    // _id: string().min(1),
    coords: tuple([number(), number()]),
    text: string().min(1),
    country: string().min(1),
    area: string().min(1),
    province: string().min(1),
    locality: string().min(1),
    street: string().min(1),
    house: string().min(1),
    apartment: string(),
    comment: string()
  })
});

export type CreateAddressInput = TypeOf<typeof createAddressSchema>["body"];
