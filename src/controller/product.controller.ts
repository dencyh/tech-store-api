import {
  AddProductImagesInput,
  CreateProductInput,
  FindManyProductInput,
  FindProductInput
} from "./../schema/products/core.product.schema";
import { Request, Response } from "express";
import {
  createProduct,
  findProductsWithParams,
  findProductById,
  addProductImages,
  findManyProductsByIds
} from "../services/product.service";
import _ from "lodash";
import { findBrandByName } from "../services/brand.service";
import { findCategoryByType } from "../services/category.service";
import logger from "../utils/logger";
import { updateSpecs } from "../services/specs.service";

export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput>,
  res: Response
) {
  try {
    const { brand, type, ...productInput } = req.body;

    const brandObj = await findBrandByName(brand.toLowerCase());
    if (!brandObj) return res.status(400).send("Brand does not exists");
    const category = await findCategoryByType(type.toLowerCase());
    if (!category) return res.status(400).send("Category does not exists");

    const product = await createProduct({
      ...productInput,
      type,
      category,
      brand: brandObj
    });

    // Update specs for type
    await updateSpecs(product._id, type);

    return res.json(product);
  } catch (e: any) {
    logger.error(e);
    return res.status(500).send(e);
  }
}

export async function addProductImagesHandler(
  req: Request<AddProductImagesInput>,
  res: Response
) {
  try {
    const { id } = req.params;
    const images = req.body.images as string[];
    console.log(images);

    if (!images) {
      return res.status(400).send("At least one image is required");
    }

    const imagePaths = images.map((img) => "static/products/" + img);

    const updated = await addProductImages(id, imagePaths);

    return res.json(updated);
  } catch (e) {
    logger.error(e);
    return res.status(500).send(e);
  }
}

export async function findAllProductsHandler(
  req: Request<{}, {}, {}, FindManyProductInput>,
  res: Response
) {
  try {
    const params = req.query;

    const products = await findProductsWithParams(params);

    return res.json(products);
  } catch (e) {
    logger.error(e);
    return res.status(500).send(e);
  }
}

export async function findOneProductHandler(
  req: Request<FindProductInput>,
  res: Response
) {
  try {
    const { id } = req.params;
    const product = await findProductById(id);
    return res.json(product);
  } catch (e) {
    logger.error(e);
    return res.status(500).send(e);
  }
}

export async function findManyProductsByIdsHandler(
  req: Request<{}, {}, string[]>,
  res: Response
) {
  try {
    const ids = req.body;
    const products = await findManyProductsByIds(ids);

    return res.json(products);
  } catch (e) {
    logger.error(e);
    return res.status(500).send(e);
  }
}
