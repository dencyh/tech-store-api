import config from "config";
import { get } from "lodash";
import SessionModel, { SessionDocument } from "../model/session.model";
import { signJwt, verifyJwt } from "../utils/jwt";
import { FilterQuery, UpdateQuery } from "mongoose";
import { findUser } from "./user.service";

export async function createSession(userId: string, userAgent: string) {
  return SessionModel.create({ user: userId, userAgent });
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return SessionModel.find(query).lean();
}

export async function removeSession(query: FilterQuery<SessionDocument>) {
  return SessionModel.findOneAndRemove(query);
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return SessionModel.updateOne(query, update);
}

export async function reIssueAccessToken({
  refreshToken
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken, "refreshTokenPublicKey");

  if (!decoded || !get(decoded, "session")) return false;

  const session = await SessionModel.findById(get(decoded, "session"));

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = signJwt(
    { ...user, session: session._id },
    "accessTokenPrivateKey",
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes
  );

  return accessToken;
}
