import BookmarkModel from "../model/bookmark.model";
import ProductModel from "../model/product.model";
import { UpdateBookmarkInput } from "../schema/bookmark.schema";

export function createBookmark(userId: string) {
  return BookmarkModel.create({ userId, bookmarks: [] });
}

export function getBookmark(userId: string) {
  return BookmarkModel.findOne({ userId });
}

export function getBookmarkWithProducts(userId: string) {
  return BookmarkModel.findOne({ userId }).populate({
    path: "products",
    model: "Product"
  });
}

export function updateBookmark({
  userId,
  products
}: {
  userId: string;
  products: UpdateBookmarkInput["products"];
}) {
  return BookmarkModel.findOneAndUpdate(
    { userId },
    {
      $set: { products: [...products] }
    }
  );
}

export function findCartProducts(ids: string[]) {
  return ProductModel.find({
    _id: { $in: ids }
  });
}
