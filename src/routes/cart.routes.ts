import { Router } from "express";
import { updateCartHandler } from "../controller/cart.controller";
import validateResource from "../middleware/validateResourse";
import { updateCartSchema } from "../schema/cart.schema";

export const cartRouter = Router();

cartRouter.put(
  "/:userId",
  /* validateResource(updateCartSchema) , */ updateCartHandler
);
