import ProductModel, { ProductDocument } from "../model/product.model";

export function createProduct(input: Partial<ProductDocument>) {
  return ProductModel.create(input);
}

export function getProducts() {
  return ProductModel.find();
}
