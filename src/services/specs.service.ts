import ProductModel, { ProductDocument } from "./../model/product.model";
import { SpecsDocument } from "./../model/specs.model";
import SpecsModel from "../model/specs.model";
import { LeanDocument } from "mongoose";
import { CreateProductInput } from "../schema/products/core.product.schema";
import { selectProductOptions } from "../controller/specs.controller";

export async function createSpecs(input: Partial<SpecsDocument>) {
  if (!input.type) return;
  const type = input.type;
  await SpecsModel.findOneAndRemove({ type });
  return SpecsModel.create(input);
}

export function removeSpecs(type: string) {}

export async function updateSpecs(productId: string, type: string) {
  const product = await ProductModel.findById(
    productId,
    selectProductOptions
  ).lean();

  let update: any = {
    $addToSet: {}
  };

  for (const key in product) {
    if (key === "specs") {
      for (const spec in product.specs) {
        update["$addToSet"] = {
          ...update["$addToSet"],
          [`specs.specs.${spec}`]:
            product["specs"][spec as keyof typeof product.specs]
        };
      }
    } else {
      update["$addToSet"] = {
        ...update["$addToSet"],
        [`specs.${key}`]: product[key as keyof typeof product]
      };
    }
  }

  const specs = await SpecsModel.findOneAndUpdate(
    { type },
    {
      ...update
    }
  );
}

export function getSpecs(type: string) {
  return SpecsModel.findOne({ type });
}
