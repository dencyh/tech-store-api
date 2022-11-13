import { ResetPasswordInput, VerifyUserInput } from "./../schema/user.schema";
import { Request, Response } from "express";
import UserModel from "../model/user.model";
import { CreateUserInput } from "../schema/user.schema";
import {
  createUser,
  findUserById,
  findUserByEmail
} from "../services/user.service";
import logger from "../utils/logger";
import { v4 as uuid } from "uuid";
import { sendVerificationEmail, sendEmail } from "../utils/mailer";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  const body = req.body;

  try {
    const user = await createUser(body);

    await sendVerificationEmail(user.toObject());

    return res.send("User created");
    // return res.json(user);
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(409).send("Account already exists");
    }
    return res.status(500).send(e);
  }
}

export async function verifyUserHandler(
  req: Request<VerifyUserInput>,
  res: Response
) {
  try {
    const id = req.params.id;
    const verificationCode = req.params.verificationCode;

    const user = await findUserById(id);
    if (!user) {
      return res.send("Could not verify user");
    }

    if (user.verified) {
      return res.send("User is already verified");
    }

    if (user.verificationCode === verificationCode) {
      user.verified = true;

      await user.save();

      return res.send("User successfully verified");
    }

    return res.send("Could not verify user");
  } catch (e: any) {
    return res.status(500).send("Could not verify user");
  }
}

export async function resetPasswordHandler(
  req: Request<{}, {}, ResetPasswordInput>,
  res: Response
) {
  const message =
    "If a user with that email is registered you will receive a password reset email";

  const { email } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    logger.debug(`User with email ${email} does not exists`);
    return res.send(message);
  }

  if (!user.verified) {
    return res.send("User is not verified");
  }

  const passwordResetCode = uuid();

  user.passwordResetCode = passwordResetCode;
  await user.save();

  // Send email with reset link
}

export async function getUsers(req: Request, res: Response) {
  const users = await UserModel.find();
  return res.json(users);
}
