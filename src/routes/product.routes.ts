import {
  addProductImagesSchema,
  findManyProductsSchema,
  findProductSchema
} from "./../schema/products/core.product.schema";
import { Router } from "express";
import { uploadImage } from "../middleware/uploadImage";

import {
  createProductHandler,
  addProductImagesHandler,
  findAllProductsHandler,
  findOneProductHandler
} from "../controller/product.controller";
import validateResource from "../middleware/validateResourse";
import { validateProduct } from "../middleware/validateProduct";

export const productRouter = Router();

productRouter.post("/", validateProduct, createProductHandler);

productRouter.patch(
  "/:id",
  uploadImage("product/").array("image"),
  validateResource(addProductImagesSchema),
  addProductImagesHandler
);

productRouter.get(
  "/",
  validateResource(findManyProductsSchema),
  findAllProductsHandler
);
productRouter.get(
  "/:id",
  validateResource(findProductSchema),
  findOneProductHandler
);

productRouter.get("/:category", validateResource(findProductSchema));
