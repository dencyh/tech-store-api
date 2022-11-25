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
  addProductImages
} from "../services/product.service";
import _ from "lodash";
import { findBrandByName } from "../services/brand.service";
import { findCategoryByType } from "../services/category.service";

export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput>,
  res: Response
) {
  try {
    const body = req.body;

    const { brandName, type } = req.body;

    const brand = await findBrandByName(brandName.toLowerCase());
    if (!brand) return res.status(400).send("Brand does not exists");
    const category = await findCategoryByType(type.toLowerCase());
    if (!category) return res.status(400).send("Category does not exists");

    const productInput = _.omit(body, "brand");

    const product = await createProduct({ ...productInput, brand, category });

    return res.json(product);
  } catch (e: any) {
    return res.status(500).send(e);
  }
}

export async function addProductImagesHandler(
  req: Request<AddProductImagesInput>,
  res: Response
) {
  try {
    const { id } = req.params;
    const images = req.files as [];

    if (!images) {
      return res.status(400).send("At least one image is required");
    }

    const imagePaths = images.map((img: any) => img.path);

    const updated = await addProductImages(id, imagePaths);
    console.log(updated);

    return res.send("Images were added");
  } catch (e) {
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
    return res.status(500).send(e);
  }
}
