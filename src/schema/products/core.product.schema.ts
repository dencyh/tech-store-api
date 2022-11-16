import { createLaptopInput } from "./laptop.shema";
import {
  array,
  date,
  literal,
  number,
  object,
  string,
  tuple,
  TypeOf,
  union
} from "zod";
import { createSmartphoneInput } from "./smartphone.shema";

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
  releaseDate: date({ required_error: "Release date is required" })
};

export type createProductInput = createSmartphoneInput | createLaptopInput;
