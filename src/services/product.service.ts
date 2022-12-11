import ProductModel, { ProductDocument } from "../model/product.model";
import logger from "../utils/logger";

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
  try {
    if (Object.keys(params).length < 1) return ProductModel.find().limit(50);

    let { type, search, ...rest } = params;
    let searchRegExp;

    type = type && JSON.parse(type);
    search = search && JSON.parse(search);
    searchRegExp = search ? new RegExp(search, "gi") : undefined;

    const queries = Object.entries(rest).reduce((acc, [key, raw]) => {
      const value = JSON.parse(raw);

      if (key === "price") {
        return { ...acc, [key]: { $gte: value[0], $lte: value[1] } };
      }

      return {
        ...acc,
        [key]: { $in: value }
      };
    }, {} as any);

    const filter = {
      ...(type && { type }),
      ...queries,
      ...(search && { name: searchRegExp })
    };

    console.log(filter);

    return ProductModel.find(filter).limit(50);
  } catch (e) {
    logger.error(e);
  }
}

export function findProductById(id: string) {
  return ProductModel.findById(id);
}

export function findManyProductsByIds(ids: string[]) {
  return ProductModel.find({ _id: { $in: ids } });
}
