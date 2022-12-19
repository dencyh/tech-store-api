import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { ProductDocument } from "./product.model";

// export interface Review {
//   score: number;
//   review?: {
//     advantages: string;
//     disadvantages: string;
//     comment: string;
//   };
//   user: UserDocument["_id"];
// }

export interface ReviewDocument extends mongoose.Document {
  user: UserDocument["_id"];
  product: ProductDocument["_id"];
  score: number;
  review: {
    advantages: string;
    disadvantages: string;
    comment: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new mongoose.Schema(
  {
    score: { type: Number, required: true },
    review: { type: Object, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    }
  },
  {
    timestamps: true
  }
);
const ReviewModel = mongoose.model<ReviewDocument>("Review", reviewSchema);

export default ReviewModel;
