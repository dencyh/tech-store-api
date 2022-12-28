import { string } from "zod";
import { CreateAddressInput } from "../schema/address.schema";
import { Request, Response } from "express";
import logger from "../utils/logger";
import { createAddress } from "../services/address.service";

export async function createAddressHandler(
  req: Request<{}, {}, CreateAddressInput>,
  res: Response
) {
  const address = req.body;
  const userId = res.locals.user._id;

  try {
    const newAddress = await createAddress(userId, address);

    return res.json(newAddress);
  } catch (e: any) {
    logger.error(e);
    return res.status(500).send(e);
  }
}
