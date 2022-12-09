import { Request, Response } from "express";
import logger from "../utils/logger";
import ProductModel from "../model/product.model";
import { createSpecs } from "../services/specs.service";
import { omit } from "lodash";

interface Unique<T> {
  [key: string]: T[];
}

export const selectProductOptions = {
  _id: 0,
  __v: 0,
  createdAt: 0,
  updatedAt: 0,
  imagePaths: 0,
  description: 0,
  type: 0,
  category: 0,
  brand: 0
};

export async function createSpecsHandler(
  req: Request<{}, {}, { type: string }>,
  res: Response
) {
  try {
    const { type } = req.body;

    const allProductsByType = await ProductModel.find(
      { type },
      selectProductOptions
    ).lean();

    const productKeys = Object.keys(allProductsByType[0]);
    const specsKeys = Object.keys(allProductsByType[0].specs);

    const specs: any = {
      specs: {}
    };

    productKeys.forEach((key) => {
      if (key === "specs") {
        const dictionary: { [key: string]: boolean } = {};
        const unique: Unique<string | number | [number, number]> = {};

        specsKeys.forEach((specKey) => {
          allProductsByType.forEach((product) => {
            const value =
              product["specs"][specKey as keyof typeof product.specs];

            if (dictionary[value.toString()]) return;

            if (unique[specKey]) {
              unique[specKey].push(value);
            } else {
              unique[specKey] = [value];
            }
            dictionary[value.toString()] = true;
          });
        });

        specs["specs"] = unique;
      } else {
        const dictionary: { [key: string]: boolean } = {};
        allProductsByType.forEach((product) => {
          const value =
            key === "brand"
              ? product[key as keyof typeof product].name
              : product[key as keyof typeof product];

          if (dictionary[value.toString()]) return;

          if (specs[key]) {
            specs[key].push(value);
          } else {
            specs[key] = [value];
          }
          dictionary[value.toString()] = true;
        });
      }
    });

    const specsForType = await createSpecs({ type, specs });

    return res.json(specsForType);
  } catch (e: any) {
    logger.error(e);
    return res.status(500).send(e);
  }
}

export async function updateSpecsHandler(
  req: Request<{}, {}, { type: string }>,
  res: Response
) {
  try {
  } catch (e) {
    logger.error(e);
    return res.status(500).send(e);
  }
}
