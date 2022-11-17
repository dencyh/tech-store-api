import { createProductInput } from "./../schema/products/core.product.schema";
import { Request, Response } from "express";
import { createProduct, getProducts } from "../services/product.service";

export async function createProductHandler(
  req: Request<{}, {}, createProductInput>,
  res: Response
) {
  const body = req.body;
  console.log(req.files);

  try {
    const product = await createProduct(body);

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

export async function getProductsHandler(req: Request, res: Response) {
  try {
    const categories = await getProducts();
    return res.json(categories);
  } catch (e) {
    return res.status(500).send(e);
  }
}
