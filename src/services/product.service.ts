import ProductModel, { ProductDocument } from "../model/product.model";
import { FindManyProductInput } from "../schema/products/core.product.schema";

export function createProduct(input: Partial<ProductDocument>) {
  return ProductModel.create(input);
}

export function findProductsWithParams(params: FindManyProductInput) {
  return ProductModel.find({ ...params });
}

export function findProductById(id: string) {
  return ProductModel.findById(id);
}
