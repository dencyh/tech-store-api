import {
  cartParamsSchema,
  getCartProductsSchema
} from "./../schema/cart.schema";
import { Router } from "express";
import {
  getCartHandler,
  getCartProductsHandler,
  updateCartHandler
} from "../controller/cart.controller";
import validateResource from "../middleware/validateResourse";
import { updateCartSchema } from "../schema/cart.schema";

export const cartRouter = Router();

cartRouter.put(
  "/:userId",
  validateResource(updateCartSchema),
  updateCartHandler
);

cartRouter.get("/:userId", validateResource(cartParamsSchema), getCartHandler);
cartRouter.post(
  "/:userId",
  validateResource(cartParamsSchema),
  getCartProductsHandler
);
