import { NextFunction, Request, Response } from "express";

export const requireOwner = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const actualId = res.locals.user._id;

  const { userId: requestedId } = req.params;
  if (requestedId) {
    const owner = actualId === requestedId;
    // console.log("owner:", actualId, "===", "requested:", requestedId);

    if (!owner) {
      return res.sendStatus(403);
    }
  }

  return next();
};
