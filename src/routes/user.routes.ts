import {
  createUserSchema,
  forgotPasswordSchema,
  verifyUserSchema
} from "./../schema/user.schema";
import { Router } from "express";
import validateResource from "../middleware/validateResourse";
import {
  createUserHandler,
  forgotPasswordHandler,
  getUsers,
  verifyUserHandler
} from "../controller/user.controller";

export const userRouter = Router();

userRouter.post("/", validateResource(createUserSchema), createUserHandler);
userRouter.get("/", getUsers);
userRouter.get(
  "/verify/:id/:verificationCode",
  validateResource(verifyUserSchema),
  verifyUserHandler
);
userRouter.post(
  "/forgotpassword",
  validateResource(forgotPasswordSchema),
  forgotPasswordHandler
);
