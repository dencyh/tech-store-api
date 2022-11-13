import UserModel, { UserDocument } from "../model/user.model";
import logger from "../utils/logger";
import * as bcrypt from "bcrypt";

export function validatePassword(password: string, candidatePassword: string) {
  try {
    return bcrypt.compareSync(password, candidatePassword);
  } catch (e) {
    logger.error(e, "Could not validate password");
    return false;
  }
}

export function createUser(input: Partial<UserDocument>) {
  return UserModel.create(input);
}

export function findUserById(id: string) {
  return UserModel.findById(id);
}

export function findUserByEmail(email: string) {
  return UserModel.findOne({ email });
}
