import { requireUser } from "./../middleware/requireUser";
import {
  addProductImagesSchema,
  findManyProductsSchema,
  findProductsByIdsSchema,
  findProductSchema
} from "./../schema/products/core.product.schema";
import { Router } from "express";
import { uploadImage } from "../middleware/uploadImage";

import {
  createProductHandler,
  addProductImagesHandler,
  findAllProductsHandler,
  findOneProductHandler,
  findManyProductsByIdsHandler
} from "../controller/product.controller";
import validateResource from "../middleware/validateResource";
import { validateProduct } from "../middleware/validateProduct";
import { resizeImage } from "../middleware/resizeImage";
import { bufferImages } from "../middleware/bufferImage";

export const productRouter = Router();

productRouter.post("/", validateProduct, createProductHandler);

productRouter.patch(
  "/:id",

  [
    requireUser,
    bufferImages,
    resizeImage("product"),
    validateResource(addProductImagesSchema)
  ],
  addProductImagesHandler
);

productRouter.get("/", findAllProductsHandler);
productRouter.get(
  "/:id",
  validateResource(findProductSchema),
  findOneProductHandler
);

productRouter.post(
  "/cart",
  validateResource(findProductsByIdsSchema),
  findManyProductsByIdsHandler
);
