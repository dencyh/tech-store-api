import { UpdateCartInput } from "./../schema/cart.schema";
import { Request, Response } from "express";
import { updateCart } from "../services/cart.service";
import logger from "../utils/logger";

export async function updateCartHandler(
  req: Request<UpdateCartInput["params"], {}, UpdateCartInput["body"]>,
  res: Response
) {
  try {
    const { userId } = req.params;
    const productsInCart = req.body;

    const updated = await updateCart({ userId, productsInCart });

    res.json(updated);
  } catch (e: any) {
    logger.error(e);
    return res.status(500).send(e);
  }
}
