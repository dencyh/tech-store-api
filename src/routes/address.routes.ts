import {
  createAddressSchema,
  updateAddressSchema
} from "./../schema/address.schema";
import { requireUser } from "./../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import { Router } from "express";
import {
  createAddressHandler,
  getAddressHandler,
  removeAddressHandler,
  updateAddressHandler
} from "../controller/address.controller";

export const addressRouter = Router();

addressRouter.post(
  "/",
  [requireUser, validateResource(createAddressSchema)],
  createAddressHandler
);

addressRouter.get("/", requireUser, getAddressHandler);
addressRouter.patch(
  "/",
  [requireUser, validateResource(updateAddressSchema)],
  updateAddressHandler
);
addressRouter.delete("/:addressId", requireUser, removeAddressHandler);
