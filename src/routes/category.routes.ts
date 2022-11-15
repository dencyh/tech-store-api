import { Router } from "express";
import multer from "multer";
import {
  createCategoryHandler,
  getCategoriesHandler
} from "../controller/category.controller";
import { uploadImage } from "../middleware/uploadImage";

export const categoryRouter = Router();

categoryRouter.post(
  "/",
  uploadImage("category/").single("image"),
  createCategoryHandler
);

categoryRouter.get("/", getCategoriesHandler);
