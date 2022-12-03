import { createSessionSchema } from "../schema/session.schema";
import { Router } from "express";
import validateResource from "../middleware/validateResourse";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler
} from "../controller/session.controller";
import { requireUser } from "../middleware/requireUser";

export const authRouter = Router();

authRouter.post(
  "/",
  validateResource(createSessionSchema),
  createUserSessionHandler
);

// authRouter.post("/refresh", refreshAccessTokenHandler);

authRouter.get("/", requireUser, getUserSessionsHandler);

authRouter.delete("/", requireUser, deleteSessionHandler);
