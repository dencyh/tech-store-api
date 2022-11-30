import { createSessionInput } from "../schema/session.schema";
import { Request, Response } from "express";
import {
  findUserByEmail,
  findUserById,
  validatePassword
} from "../services/user.service";
import {
  findSessionById,
  signAccessToken,
  signRefreshToken
} from "../services/session.service";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt";
import logger from "../utils/logger";

export async function createSessionHandler(
  req: Request<{}, {}, createSessionInput>,
  res: Response
) {
  try {
    const message = "Invalid email or password";
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.send(message);
    }

    if (!user.verified) {
      return res.send("Please verify your email");
    }

    const isValid = await validatePassword({ email, password });

    if (!isValid) {
      return res.send(message);
    }

    const accessToken = signAccessToken(user);
    const refreshToken = await signRefreshToken({ userId: user.id });

    return res.send({
      accessToken,
      refreshToken
    });
  } catch (e) {
    logger.error(e);
    return e;
  }
}

export async function refreshAccessTokenHandler(req: Request, res: Response) {
  const message = "Could not refresh access token";
  const refreshToken = get(req, "headers.x-refresh")?.toString() || "";

  const decoded = verifyJwt<{ session: string }>(
    refreshToken,
    "refreshTokenPublicKey"
  );
  if (!decoded) {
    return res.status(401).send(message);
  }

  const session = await findSessionById(decoded.session);

  if (!session || !session.valid) {
    return res.status(401).send(message);
  }

  const user = await findUserById(String(session.user));

  if (!user) {
    return res.status(401).send(message);
  }

  const accessToken = signAccessToken(user);

  return res.send({ accessToken });
}
