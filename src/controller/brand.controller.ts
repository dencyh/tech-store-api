import { string } from "zod";
import { createBrandInput } from "./../schema/brand.schema";
import { Request, Response } from "express";
import { createBrand, findBrandsByType } from "../services/brand.service";
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
    logger.error(e);
    return res.status(500).send(e);
  }
}

export async function findBrandsByTypeHandler(
  req: Request<{ type: string }>,
  res: Response
) {
  try {
    const { type } = req.params;

    const brands = await findBrandsByType(type);

    return res.json(brands);
  } catch (e) {
    logger.error(e);
    return res.status(500).send(e);
  }
}
