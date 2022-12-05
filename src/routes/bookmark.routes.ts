import { requireUser } from "./../middleware/requireUser";
import {
  bookmarkParamsSchema,
  updateBookmarkSchema
} from "./../schema/bookmark.schema";

import { Router } from "express";
import validateResource from "../middleware/validateResourse";
import {
  getBookmarkHandler,
  updateBookmarkHandler
} from "../controller/bookmark.controller";

export const bookmarkRouter = Router();

bookmarkRouter.put(
  "/:userId",
  [requireUser, validateResource(updateBookmarkSchema)],
  updateBookmarkHandler
);

bookmarkRouter.get(
  "/:userId",
  [requireUser, validateResource(bookmarkParamsSchema)],
  getBookmarkHandler
);
