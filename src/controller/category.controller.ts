import { Request, Response } from "express";
import { createCategoryInput } from "../schema/category.schema";
import { createCategory, getCategories } from "../services/category.service";

export async function createCategoryHandler(
  req: Request<{}, {}, createCategoryInput>,
  res: Response
) {
  const { name } = req.body;
  const imagePath = req.file?.path;

  if (!imagePath) {
    return res.status(400).send("Image path is required");
  }

  try {
    const category = await createCategory({ name, imagePath });

    return res.json(category);
  } catch (e: any) {
    return res.status(500).send(e);
  }
}

export async function getCategoriesHandler(req: Request, res: Response) {
  try {
    const categories = await getCategories();
    return res.json(categories);
  } catch (e) {
    return res.status(500).send(e);
  }
}
