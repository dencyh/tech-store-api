import {
  BookmarkParamsInput,
  UpdateBookmarkInput
} from "./../schema/bookmark.schema";
import { Request, Response } from "express";

import logger from "../utils/logger";
import {
  getBookmark,
  getBookmarkWithProducts,
  updateBookmark
} from "../services/bookmark.service";

export async function updateBookmarkHandler(
  req: Request<BookmarkParamsInput, {}, UpdateBookmarkInput>,
  res: Response
) {
  try {
    const { userId } = req.params;
    const { products } = req.body;

    const updated = await updateBookmark({ userId, products });

    res.json(updated);
  } catch (e: any) {
    logger.error(e);
    return res.status(500).send(e);
  }
}

export async function getBookmarkHandler(
  req: Request<BookmarkParamsInput>,
  res: Response
) {
  try {
    const { userId } = req.params;

    const bookmark = await getBookmark(userId);

    res.json(bookmark);
  } catch (e: any) {
    logger.error(e);
    return res.status(500).send(e);
  }
}

export async function getBookmarkProductsHandler(
  req: Request<BookmarkParamsInput, {}>,
  res: Response
) {
  try {
    const { userId } = req.params;
    const cart = await getBookmarkWithProducts(userId);

    res.json(cart);
  } catch (e) {
    logger.error(e);
    return res.status(500).send(e);
  }
}
