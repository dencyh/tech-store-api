import { CartDocument } from "./../model/cart.model";
import { ProductDocument } from "./../model/product.model";
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
    const { products } = req.body;

    const updated = await updateCart({ userId, products });

    res.json(updated);
  } catch (e: any) {
    logger.error(e);
    return res.status(500).send(e);
  }
}

export async function getCartHandler(
  req: Request<CartParamsInput, {}>,
  res: Response
) {
  try {
    const { userId } = req.params;

    const cart = await getCartWithProducts(userId);

    let products = [] as CartDocument["products"];

    if (cart?.products) {
      products = cart.products;
    }

    res.json(products);
  } catch (e) {
    logger.error(e);
    return res.status(500).send(e);
  }
}
