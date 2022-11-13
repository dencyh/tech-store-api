import { createUserSchema, verifyUserSchema } from "./../schema/user.schema";
import { Router } from "express";
import validateResource from "../middleware/validateResourse";
import {
  createUserHandler,
  getUsers,
  verifyUserHandler
} from "../controller/user.controller";

export const userRouter = Router();

userRouter.post("/", validateResource(createUserSchema), createUserHandler);
userRouter.get("/", getUsers);
userRouter.post(
  "/verify/:id/:verificationCode",
  validateResource(verifyUserSchema),
  verifyUserHandler
);
