import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import config from "config";
import logger from "../utils/logger";
import { v4 as uuid } from "uuid";

export interface UserDocument extends mongoose.Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  verificationCode: string;
  passwordResetCode: string | null;
  verified: false;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    verificationCode: {
      type: String,
      required: true,
      default: uuid()
    },
    passwordResetCode: { type: String },
    verified: { type: Boolean, required: true, default: false }
  },
  {
    timestamps: true
  }
);

userSchema.pre<UserDocument>("save", async function (next) {
  let user = this as UserDocument;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
