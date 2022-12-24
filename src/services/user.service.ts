import UserModel, { UserDocument } from "../model/user.model";
import logger from "../utils/logger";
import * as bcrypt from "bcrypt";
import { omit } from "lodash";
import { FilterQuery, UpdateQuery } from "mongoose";

export async function validatePassword({
  email,
  password
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), "password");
}

export function createUser(input: Partial<UserDocument>) {
  return UserModel.create(input);
}

export function updateUser(id: string, update: UpdateQuery<UserDocument>) {
  return UserModel.findOneAndUpdate({ _id: id }, update, {
    returnDocument: "after"
  }).lean();
}

export function findUserById(id: string) {
  return UserModel.findById(id);
}

export function findUserByEmail(email: string) {
  return UserModel.findOne({ email });
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}
