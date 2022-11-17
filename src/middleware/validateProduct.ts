import { Request, Response, NextFunction } from "express";
import { productTypeSchemas } from "../schema/products/core.product.schema";

export const validateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const type = req.body.type as keyof typeof productTypeSchemas;

    if (!type) {
      return res.status(400).send("Product type is required");
    }

    if (type) {
      productTypeSchemas[type].parse({
        body: req.body,
        query: req.query,
        params: req.params
      });
    } else {
      throw new Error("Product type is required");
    }

    next();
  } catch (e: any) {
    return res.status(400).send(e.errors || "This product type doesn't exist");
  }
};

export default validateProduct;
