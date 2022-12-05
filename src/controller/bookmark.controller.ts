import { BookmarkDocument } from "./../model/bookmark.model";
import {
  BookmarkParamsInput,
  UpdateBookmarkInput
} from "./../schema/bookmark.schema";
import { Request, Response } from "express";

import logger from "../utils/logger";
import { getBookmarks, updateBookmark } from "../services/bookmark.service";

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

    let products = [] as BookmarkDocument["products"];
    const bookmark = await getBookmarks(userId);
    if (bookmark?.products) {
      products = bookmark.products;
    }

    res.json(products);
  } catch (e: any) {
    logger.error(e);
    return res.status(500).send(e);
  }
}
