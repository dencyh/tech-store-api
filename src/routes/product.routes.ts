import { Router } from "express";
import { uploadImage } from "../middleware/uploadImage";

import {
  getProductsHandler,
  createProductHandler
} from "../controller/product.controller";
import validateResource from "../middleware/validateResourse";
import { createCategorySchema } from "../schema/category.schema";
import { validateProduct } from "../middleware/validateProduct";

export const productRouter = Router();

productRouter.post(
  "/",
  uploadImage("product/").array("image"),
  validateProduct,
  createProductHandler
);

productRouter.get("/", getProductsHandler);
