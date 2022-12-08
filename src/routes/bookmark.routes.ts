import { requireOwner } from "./../middleware/requiredOwner";
import { requireUser } from "./../middleware/requireUser";
import {
  bookmarkParamsSchema,
  updateBookmarkSchema
} from "./../schema/bookmark.schema";

import { Router } from "express";
import validateResource from "../middleware/validateResource";
import {
  getBookmarkHandler,
  updateBookmarkHandler
} from "../controller/bookmark.controller";

export const bookmarkRouter = Router();

bookmarkRouter.put(
  "/:userId",
  [requireUser, requireOwner, validateResource(updateBookmarkSchema)],
  updateBookmarkHandler
);

bookmarkRouter.get(
  "/:userId",
  [requireUser, requireOwner, validateResource(bookmarkParamsSchema)],
  getBookmarkHandler
);
