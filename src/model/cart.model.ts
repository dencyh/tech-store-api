import { ProductDocument } from "./product.model";
import { UserDocument } from "./user.model";
import mongoose from "mongoose";

export interface CartDocument extends mongoose.Document {
  userId: UserDocument["_id"];
  productsInCart: {
    quantity: number;
    productId: ProductDocument["_id"];
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    productsInCart: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product"
        },
        quantity: { type: Number, required: true }
      }
    ]
  },
  {
    timestamps: true
  }
);
const CartModel = mongoose.model<CartDocument>("Cart", cartSchema);

export default CartModel;
