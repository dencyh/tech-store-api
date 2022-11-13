import { createSessionSchema } from "../schema/session.schema";
import { Router } from "express";
import validateResource from "../middleware/validateResourse";
import {
  createSessionHandler,
  refreshAccessTokenHandler
} from "../controller/session.controller";

export const authRouter = Router();

authRouter.post(
  "/",
  validateResource(createSessionSchema),
  createSessionHandler
);

authRouter.post("/refresh", refreshAccessTokenHandler);
