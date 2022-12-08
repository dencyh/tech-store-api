import { requireUser } from "./../middleware/requireUser";
import { createBrandSchema } from "./../schema/brand.schema";
import { Router } from "express";
import {
  createBrandHandler,
  findBrandsByTypeHandler
} from "../controller/brand.controller";
import validateResource from "../middleware/validateResource";

export const brandRouter = Router();

brandRouter.post(
  "/",
  [/* requireUser,  */ validateResource(createBrandSchema)],
  createBrandHandler
);

brandRouter.get("/:type", findBrandsByTypeHandler);
