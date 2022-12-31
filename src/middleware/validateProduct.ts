import { CreateProductInput } from "./../schema/products/core.product.schema";
import { Request, Response, NextFunction } from "express";
import { productTypeSchemas } from "../schema/products/core.product.schema";
import logger from "../utils/logger";

export const validateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const type = req.body.type as CreateProductInput["type"];

    if (!type) {
      return res.status(400).send("Product type is required");
    }

    // Fetch schema for validation based on type

    let schemas = productTypeSchemas[type];
    if (Array.isArray(schemas)) {
      // TODO Check later
      const isValid = schemas.map((schema) =>
        schema.parse({
          body: req.body,
          query: req.query,
          params: req.params
        })
      );
      console.log(isValid);
    } else {
      schemas.parse({
        body: req.body,
        query: req.query,
        params: req.params
      });
    }

    next();
  } catch (e: any) {
    logger.error(e);
    return res.status(400).send(e.errors || "This product type doesn't exist");
  }
};

export default validateProduct;
