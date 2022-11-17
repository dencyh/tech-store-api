import {
  createProductInput,
  FindProductInput
} from "./../schema/products/core.product.schema";
import { Request, Response } from "express";
import {
  createProduct,
  findAllProducts,
  findProductsById
} from "../services/product.service";
import _ from "lodash";
import { findBrandByName } from "../services/brand.service";

export async function createProductHandler(
  req: Request<{}, {}, createProductInput>,
  res: Response
) {
  const body = req.body;

  const { brandName } = req.body;

  const brand = await findBrandByName(brandName.toLowerCase());

  const productInput = _.omit(body, "brand");

  try {
    const product = await createProduct({ ...productInput, brand });

    return res.json(product);
  } catch (e: any) {
    return res.status(500).send(e);
  }
}

export async function addProductImagesHandler(req: Request, res: Response) {
  const imagePath = req.file?.path;
  if (!imagePath) {
    return res.status(400).send("Image path is required");
  }
}

export async function findAllProductsHandler(req: Request, res: Response) {
  try {
    const products = await findAllProducts();
    return res.json(products);
  } catch (e) {
    return res.status(500).send(e);
  }
}

export async function findProductsHandler(
  req: Request<FindProductInput>,
  res: Response
) {
  try {
    const { id } = req.params;
    const product = await findProductsById(id);
    return res.json(product);
  } catch (e) {
    return res.status(500).send(e);
  }
}
