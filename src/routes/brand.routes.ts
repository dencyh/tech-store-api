import { createBrandSchema } from "./../schema/brand.schema";
import { Router } from "express";
import { createBrandHandler } from "../controller/brand.controller";
import validateResource from "../middleware/validateResourse";

export const brandRouter = Router();

brandRouter.post("/", validateResource(createBrandSchema), createBrandHandler);
