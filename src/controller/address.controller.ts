import {
  CreateAddressInput,
  UpdateAddressInput
} from "./../schema/address.schema";
import { Request, Response } from "express";
import logger from "../utils/logger";
import {
  createAddress,
  getUserAddresses,
  removeAddress,
  updateAddress
} from "../services/address.service";

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

export async function updateAddressHandler(
  req: Request<{}, {}, UpdateAddressInput>,
  res: Response
) {
  const newAddress = req.body;

  try {
    const address = await updateAddress(newAddress);

    return res.json(address);
  } catch (e: any) {
    logger.error(e);
    return res.status(500).send(e);
  }
}

export async function removeAddressHandler(
  req: Request<{ addressId: string }>,
  res: Response
) {
  const { addressId } = req.params;

  try {
    const address = await removeAddress(addressId);

    return res.json(address);
  } catch (e: any) {
    logger.error(e);
    return res.status(500).send(e);
  }
}
