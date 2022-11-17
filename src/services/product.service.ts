import ProductModel, { ProductDocument } from "../model/product.model";

export function createProduct(input: Partial<ProductDocument>) {
  return ProductModel.create(input);
}

export function findAllProducts() {
  return ProductModel.find();
}

export function findProductsById(id: string) {
  return ProductModel.findById(id);
}
