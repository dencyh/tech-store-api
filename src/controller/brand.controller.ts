import { createBrandInput } from "./../schema/brand.schema";
import { Request, Response } from "express";
import { createBrand } from "../services/brand.service";
import logger from "../utils/logger";

export async function createBrandHandler(
  req: Request<{}, {}, createBrandInput>,
  res: Response
) {
  const input = req.body;

  try {
    const brand = await createBrand(input);

    return res.json(brand);
  } catch (e: any) {
    logger.error(e)
    return res.status(500).send(e);
  }
}
