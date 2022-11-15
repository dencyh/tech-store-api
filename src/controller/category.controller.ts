import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { createCategoryInput } from "../schema/category.schema";
import { createCategory, getCategories } from "../services/product.service";
import multer from "multer";

export async function createCategoryHandler(
  req: Request<{}, {}>,
  res: Response
) {
  const { title } = req.body;
  const imgPath = req.file?.path;
  console.log(imgPath);

  try {
    const category = await createCategory({ title, image: imgPath });

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
