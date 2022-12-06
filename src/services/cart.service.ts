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
    path: "products.product",
    model: "Product"
  });
}

export function updateCart({
  userId,
  products
}: {
  userId: string;
  products: UpdateCartInput["products"];
}) {
  return CartModel.findOneAndUpdate(
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
