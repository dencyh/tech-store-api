import { requireUser } from "./../middleware/requireUser";
import { createCategorySchema } from "./../schema/category.schema";
import { Router } from "express";
import {
  createCategoryHandler,
  getCategoriesHandler
} from "../controller/category.controller";
import validateResource from "../middleware/validateResource";
import { bufferImages } from "../middleware/bufferImage";
import { uploadImages } from "../middleware/uploadImages";

export const categoryRouter = Router();

categoryRouter.post(
  "/",
  [
    bufferImages,
    uploadImages("category"),
    requireUser,
    validateResource(createCategorySchema)
  ],
  createCategoryHandler
);

categoryRouter.get("/", getCategoriesHandler);
