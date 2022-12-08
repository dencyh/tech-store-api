import { createSessionSchema } from "../schema/session.schema";
import { Router } from "express";
import validateResource from "../middleware/validateResource";
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


authRouter.get("/", requireUser, getUserSessionsHandler);

authRouter.delete("/", requireUser, deleteSessionHandler);
