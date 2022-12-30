import { string } from "zod";
import { CreateAddressInput } from "../schema/address.schema";
import { Request, Response } from "express";
import logger from "../utils/logger";
import { createAddress, getUserAddresses } from "../services/address.service";

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

export async function getAddressHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  try {
    const addresses = await getUserAddresses(userId);
    const userAddresses = addresses.map((address) => address.address);

    return res.json(userAddresses);
  } catch (e: any) {
    logger.error(e);
    return res.status(500).send(e);
  }
}
