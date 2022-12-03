import { Request, Response } from "express";
import config from "config";
import { validatePassword } from "../services/user.service";
import {
  createSession,
  findSessions,
  updateSession
} from "../services/session.service";
import { signJwt } from "../utils/jwt";
import logger from "../utils/logger";

export async function createUserSessionHandler(req: Request, res: Response) {
  try {
    // Validate the user's password
    const user = await validatePassword(req.body);

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    // create a session
    const session = await createSession(user._id, req.get("user-agent") || "");

    // create an access token

    const accessToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: config.get("accessTokenTtl") }
    );

    // create a refresh token
    const refreshToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: config.get("refreshTokenTtl") }
    );

    // return access & refresh tokens

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 15,
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "strict",
      secure: false
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 365,
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "strict",
      secure: false
    });

    return res.send({ accessToken, refreshToken });
  } catch (e: any) {
    logger.error(e);
    return res.status(500).send(e);
  }
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  try {
    const userId = res.locals.user._id;

    const sessions = await findSessions({ user: userId, valid: true });

    return res.send(sessions);
  } catch (e) {
    logger.error(e);
    return res.status(500).send(e);
  }
}

export async function deleteSessionHandler(req: Request, res: Response) {
  try {
    const sessionId = res.locals.user.session;

    await updateSession({ _id: sessionId }, { valid: false });

    return res.send({
      accessToken: null,
      refreshToken: null
    });
  } catch (e) {
    logger.error(e);
    return res.status(500).send(e);
  }
}
