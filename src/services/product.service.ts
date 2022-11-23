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

export function findProductsWithParams(params: FindManyProductInput) {
  return ProductModel.find({ ...params }).limit(50);
  // .sort({ price: "desc" })
}

export function findProductById(id: string) {
  return ProductModel.findById(id);
}
