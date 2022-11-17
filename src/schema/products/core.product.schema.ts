import { createPhoneSchema } from "./phone.shema";
import { createLaptopInput, createLaptopSchema } from "./laptop.shema";
import { date, literal, number, object, string, TypeOf, union } from "zod";
import { createPhoneInput } from "./phone.shema";

export type ProductColor =
  | "белый"
  | "желтый"
  | "зеленый"
  | "золотой"
  | "коричневый"
  | "розовый"
  | "серебристый"
  | "серый"
  | "синий"
  | "фиолетовый"
  | "черный";

const colors = [
  literal("белый"),
  literal("желтый"),
  literal("зеленый"),
  literal("золотой"),
  literal("коричневый"),
  literal("розовый"),
  literal("серебристый"),
  literal("серый"),
  literal("синий"),
  literal("фиолетовый"),
  literal("черный")
] as const;

export const createProductSchema = {
  name: string({ required_error: "Product name is required" }),
  price: number({ required_error: "Price is required" }),
  brand: string({ required_error: "Brand name is required" }),
  color: union(colors, { required_error: "Color is required" }),
  releaseDate: number({ required_error: "Release date is required" })
};

export type createProductInput = createPhoneInput | createLaptopInput;

export const productTypeSchemas = {
  phone: createPhoneSchema,
  laptop: createLaptopSchema
};

export const addProductImagesSchema = {
  body: object({
    _id: string({ required_error: "Id is required to update images" })
  })
};

export type AddProductImagesInput = TypeOf<typeof createLaptopSchema>["body"];
