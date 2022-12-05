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
import validateResource from "../middleware/validateResourse";
import { updateCartSchema } from "../schema/cart.schema";

export const cartRouter = Router();

cartRouter.put(
  "/:userId",
  [requireUser, validateResource(updateCartSchema)],
  updateCartHandler
);

cartRouter.get(
  "/:userId",
  [requireUser, validateResource(cartParamsSchema)],
  getCartHandler
);
// cartRouter.post(
//   "/:userId",
//   [requireUser, validateResource(cartParamsSchema)],
//   getCartProductsHandler
// );
