import { createAddressSchema } from "./../schema/address.schema";
import { requireUser } from "./../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import { Router } from "express";
import { createAddressHandler } from "../controller/address.controller";

export const addressRouter = Router();

addressRouter.post(
  "/",
  [requireUser, validateResource(createAddressSchema)],
  createAddressHandler
);
