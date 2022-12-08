import { requireUser } from "./../middleware/requireUser";
import {
  cartParamsSchema,
  getCartProductsSchema
} from "./../schema/cart.schema";
import { Router } from "express";
import {
  getCartHandler,
  // getCartProductsHandler,
  updateCartHandler
} from "../controller/cart.controller";
import validateResource from "../middleware/validateResource";
import { updateCartSchema } from "../schema/cart.schema";
import { requireOwner } from "../middleware/requiredOwner";

export const cartRouter = Router();

cartRouter.put(
  "/:userId",
  [requireUser, requireOwner, validateResource(updateCartSchema)],
  updateCartHandler
);

cartRouter.get(
  "/:userId",
  [requireUser, requireOwner, validateResource(cartParamsSchema)],
  getCartHandler
);
