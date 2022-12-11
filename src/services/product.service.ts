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
}

export function findProductsWithParams(params: ProductQuery) {
  if (Object.keys(params).length < 1) return ProductModel.find().limit(50);
  const { type, search, ...rest } = params;

  const queries = Object.entries(rest).reduce((acc, [key, value]) => {
    const notNum = /[А-Яа-яA-Za-z]+/g.test(value) || isNaN(Number(value));

    if (key === "price") {
      const range = value.split(",").map((price) => Number(price));
      return { ...acc, [key]: { $gte: range[0], $lte: range[1] } };
    }

    if (notNum) {
      return {
        ...acc,
        [key]: { $in: value.split(",") }
      };
    } else {
      return {
        ...acc,
        [key]: {
          $in: value.split(",").map((value) => Number(value))
        }
      };
    }
  }, {});

  const filter = type ? { type, ...queries } : { ...queries };

  console.log(filter);

  return ProductModel.find(filter).limit(50);
}

export function findProductById(id: string) {
  return ProductModel.findById(id);
}

export function findManyProductsByIds(ids: string[]) {
  return ProductModel.find({ _id: { $in: ids } });
}
