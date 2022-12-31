import { number, object, string, tuple, TypeOf } from "zod";

const coreAddress = {
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
};

export const createAddressSchema = object({
  body: object(coreAddress)
});

export const updateAddressSchema = object({
  body: object({
    ...coreAddress,
    _id: string().min(1)
  })
});

export type CreateAddressInput = TypeOf<typeof createAddressSchema>["body"];

export type UpdateAddressInput = TypeOf<typeof updateAddressSchema>["body"];
