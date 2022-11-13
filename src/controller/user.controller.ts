import { VerifyUserInput } from "./../schema/user.schema";
import { Request, Response } from "express";
import UserModel from "../model/user.model";
import { CreateUserInput } from "../schema/user.schema";
import { createUser, findUserById } from "../services/user.service";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  const body = req.body;

  try {
    const user = await createUser(body);
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
}

export async function getUsers(req: Request, res: Response) {
  const users = await UserModel.find();
  return res.json(users);
}
