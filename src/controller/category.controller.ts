import { Request, Response } from "express";
import { createCategoryInput } from "../schema/category.schema";
import { createCategory, getCategories } from "../services/category.service";
import logger from "../utils/logger";

export async function createCategoryHandler(
  req: Request<{}, {}, createCategoryInput>,
  res: Response
) {
  const { images, ...rest } = req.body;
  const image = images[0];

  if (!image) {
    return res.status(400).send("Image path is required");
  }

  try {
    const category = await createCategory({ ...rest, image });

    return res.json(category);
  } catch (e: any) {
    logger.error(e);
    return res.status(500).send(e);
  }
}

export async function getCategoriesHandler(req: Request, res: Response) {
  try {
    const categories = await getCategories();
    return res.json(categories);
  } catch (e) {
    logger.error(e);
    return res.status(500).send(e);
  }
}
