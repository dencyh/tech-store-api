import {
  createUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyUserSchema
} from "./../schema/user.schema";
import { Router } from "express";
import validateResource from "../middleware/validateResource";
import {
  createUserHandler,
  forgotPasswordHandler,
  getCurrentUserHandler,
  getUsers,
  resetsPasswordHandler,
  verifyUserHandler
} from "../controller/user.controller";
import { requireUser } from "../middleware/requireUser";

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
userRouter.post(
  "/resetpassword/:id/:passwordResetCode",
  validateResource(resetPasswordSchema),
  resetsPasswordHandler
);

userRouter.get("/me", requireUser, getCurrentUserHandler);
