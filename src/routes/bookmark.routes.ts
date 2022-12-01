import {
  bookmarkParamsSchema,
  updateBookmarkSchema
} from "./../schema/bookmark.schema";

import { Router } from "express";
import validateResource from "../middleware/validateResourse";
import {
  getBookmarkProductsHandler,
  updateBookmarkHandler
} from "../controller/bookmark.controller";

export const bookmarkRouter = Router();

bookmarkRouter.put(
  "/:userId",
  validateResource(updateBookmarkSchema),
  updateBookmarkHandler
);

bookmarkRouter.get(
  "/:userId",
  validateResource(bookmarkParamsSchema),
  getBookmarkProductsHandler
);
