import { ProductDocument } from "./product.model";
import { UserDocument } from "./user.model";
import mongoose from "mongoose";

export interface BookmarkDocument extends mongoose.Document {
  userId: UserDocument["_id"];
  bookmarks: ProductDocument["_id"][];
  createdAt: Date;
  updatedAt: Date;
}

const bookmarkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product"
      }
    ]
  },
  {
    timestamps: true
  }
);
const BookmarkModel = mongoose.model<BookmarkDocument>(
  "Bookmark",
  bookmarkSchema
);

export default BookmarkModel;
