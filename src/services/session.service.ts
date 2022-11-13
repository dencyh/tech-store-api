import config from "config";
import { sign } from "crypto";
import SessionModel from "../model/session.model";
import { signJwt } from "../utils/jwt";
import { UserDocument, UserPrivateFields } from "../model/user.model";
import { omit } from "lodash";

export async function createSession({ userId }: { userId: string }) {
  return SessionModel.create({ user: userId });
}

export async function findSessionById(id: string) {
  return SessionModel.findById(id);
}

export async function signRefreshToken({ userId }: { userId: string }) {
  const session = await createSession({ userId });

  const refreshToken = signJwt(
    {
      session: session._id
    },
    "refreshTokenPrivateKey",
    {
      expiresIn: config.get("refreshTokenTtl")
    }
  );

  return refreshToken;
}

export function signAccessToken(user: any) {
  const payload = omit(user.toJSON(), UserPrivateFields);

  const accessToken = signJwt(payload, "accessTokenPrivateKey", {
    expiresIn: config.get("accessTokenTtl")
  });

  return accessToken;
}
