import { UpdateCartInput } from "../schema/cart.schema";
import CartModel, { CartDocument } from "./../model/cart.model";

export function createCart(userId: string) {
  return CartModel.create({ userId, products: [] });
}

export function updateCart({
  userId,
  productsInCart
}: {
  userId: UpdateCartInput["params"]["userId"];
  productsInCart: UpdateCartInput["body"];
}) {
  return CartModel.findOneAndUpdate(
    { userId },
    {
      $set: { productsInCart: [...productsInCart] }
    }
  );
}
