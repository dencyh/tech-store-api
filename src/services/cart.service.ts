import ProductModel from "../model/product.model";
import { UpdateCartInput } from "../schema/cart.schema";
import CartModel, { CartDocument } from "./../model/cart.model";

export function createCart(userId: string) {
  return CartModel.create({ userId, products: [] });
}

export function getCart(userId: string) {
  return CartModel.findOne({ userId });
}

export function getCartWithProducts(userId: string) {
  return CartModel.findOne({ userId }).populate({
    path: "productsInCart.productId",
    model: "Product"
  });
}

export function updateCart({
  userId,
  productsInCart
}: {
  userId: string;
  productsInCart: UpdateCartInput["productsInCart"];
}) {
  return CartModel.findOneAndUpdate(
    { userId },
    {
      $set: { productsInCart: [...productsInCart] }
    }
  );
}

export function findCartProducts(ids: string[]) {
  return ProductModel.find({
    _id: { $in: ids }
  });
}
