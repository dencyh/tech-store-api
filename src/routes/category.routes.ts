import { createCategorySchema } from "./../schema/category.schema";
import { Router } from "express";
import {
  createCategoryHandler,
  getCategoriesHandler
} from "../controller/category.controller";
import { uploadImage } from "../middleware/uploadImage";
import validateResource from "../middleware/validateResourse";

export const categoryRouter = Router();

categoryRouter.post(
  "/",
  uploadImage("category/").single("image"),
  validateResource(createCategorySchema),
  createCategoryHandler
);

categoryRouter.get("/", getCategoriesHandler);
