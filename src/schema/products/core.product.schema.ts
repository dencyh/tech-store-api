import {
  CreateConsoleInput,
  createConsoleSchema,
  CreateGameInput,
  createGameSchema
} from "./gaming.schema";
import { createPhoneSchema } from "./phone.schema";
import { createLaptopInput, createLaptopSchema } from "./laptop.schema";
import { AnyZodObject, z } from "zod";
import { createPhoneInput } from "./phone.schema";
import {
  createHeadphonesSchema,
  createOtherAudioSchema,
  HeadphonesInput,
  OtherAudioInput
} from "./audio.schema";
import {
  CreateAccessoryInput,
  createAccessorySchema
} from "./accessory.schema";
import { CreateSmartHomeInput } from "./smartHome.schema";
import { CreateTabletInput, createTabletSchema } from "./tablet.schema";
import { CreateWatchInput, createWatchSchema } from "./watch.schema";
import { CreateDroneInput, createDroneSchema } from "./drones.schema";

export const coreProductSchema = {
  name: z.string({ required_error: "Product name is required" }),
  price: z.number({ required_error: "Price is required" }),
  brand: z.string({ required_error: "Brand name is required" }),
  description: z.string().optional(),

  releaseDate: z.number({ required_error: "Release date is required" }),
  imagePaths: z.array(z.string()).optional()
};

export type CreateProductInput =
  | createPhoneInput
  | createLaptopInput
  | CreateGameInput
  | CreateConsoleInput
  | HeadphonesInput
  | OtherAudioInput
  | CreateTabletInput
  | CreateWatchInput
  | CreateSmartHomeInput
  | CreateDroneInput
  | CreateAccessoryInput;

export const productTypeSchemas: {
  [key in CreateProductInput["type"]]: AnyZodObject | AnyZodObject[];
} = {
  smartphones: createPhoneSchema,
  laptops: createLaptopSchema,
  tablets: createTabletSchema,
  watches: createWatchSchema,
  gaming: [createConsoleSchema, createGameSchema],
  audio: [createHeadphonesSchema, createOtherAudioSchema],
  drones: createDroneSchema,
  accessories: createAccessorySchema
};

export const addProductImagesSchema = z.object({
  params: z.object({
    id: z.string({ required_error: "Product id is required to update images" })
  })
});

export type AddProductImagesInput = z.infer<
  typeof addProductImagesSchema
>["params"];

export const findProductSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "Product id is required"
    })
  })
});

export type FindProductInput = z.infer<typeof findProductSchema>["params"];

export const findManyProductsSchema = z.object({
  query: z.object({
    type: z.string()
  })
});

export type FindManyProductInput = z.infer<
  typeof findManyProductsSchema
>["query"];

export const findProductsByIdsSchema = z.object({
  body: z.array(z.string())
});

export type FindProductsByIdsInput = z.infer<
  typeof findProductsByIdsSchema
>["body"];
