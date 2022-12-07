import ProductModel, { ProductDocument } from "../model/product.model";
import { FindManyProductInput } from "../schema/products/core.product.schema";

export function createProduct(input: Partial<ProductDocument>) {
  return ProductModel.create(input);
}

export function addProductImages(id: string, imgArr: string[]) {
  return ProductModel.findOneAndUpdate(
    { _id: id },
    {
      $push: { imagePaths: { $each: imgArr } }
    }
  );
}

interface ProductQuery {
  [key: string]: string;
  type: string;
}

export function findProductsWithParams(params: ProductQuery) {
  const { type, ...rest } = params;
  const queries = Object.entries(rest).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: new RegExp(value, "gi") }),
    {}
  );
  return ProductModel.find({ type, ...queries }).limit(50);
  // .sort({ price: "desc" })
}

export function findProductById(id: string) {
  return ProductModel.findById(id);
}

export function findManyProductsByIds(ids: string[]) {
  return ProductModel.find({ _id: { $in: ids } });
}
