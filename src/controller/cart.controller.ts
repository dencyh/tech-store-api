import {
  CartParamsInput,
  GetCartProductsInput,
  UpdateCartInput
} from "./../schema/cart.schema";
import { Request, Response } from "express";
import {
  findCartProducts,
  getCart,
  getCartWithProducts,
  updateCart
} from "../services/cart.service";
import logger from "../utils/logger";

export async function updateCartHandler(
  req: Request<CartParamsInput, {}, UpdateCartInput>,
  res: Response
) {
  try {
    const { userId } = req.params;
    const { productsInCart } = req.body;

    const updated = await updateCart({ userId, productsInCart });

    res.json(updated);
  } catch (e: any) {
    logger.error(e);
    return res.status(500).send(e);
  }
}

export async function getCartHandler(
  req: Request<CartParamsInput>,
  res: Response
) {
  try {
    const { userId } = req.params;

    const cart = await getCart(userId);

    res.json(cart);
  } catch (e: any) {
    logger.error(e);
    return res.status(500).send(e);
  }
}

export async function getCartProductsHandler(
  req: Request<CartParamsInput, {}>,
  res: Response
) {
  try {
    const { userId } = req.params;
    const cart = await getCartWithProducts(userId);

    res.json(cart);
  } catch (e) {
    logger.error(e);
    return res.status(500).send(e);
  }
}
