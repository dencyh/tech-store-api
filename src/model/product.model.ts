import { string } from "zod";
import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { CategoryDocument } from "./category.model";

export interface ProductDocument extends mongoose.Document {
  user: UserDocument["_id"];
  category: CategoryDocument["_id"];
  title: string;
  description: string;
  price: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true }
  },
  {
    timestamps: true
  }
);
const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
