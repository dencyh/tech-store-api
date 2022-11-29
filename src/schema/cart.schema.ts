import { array, number, object, string, TypeOf } from "zod";

export const updateCartSchema = object({
  params: object({
    userId: string({ required_error: "User id is required to update the cart" })
  }),
  body: array(
    object({
      productId: string({ required_error: "Product ID is required" }),
      quantity: number({
        required_error: "Specify the quantity of the product"
      })
    })
  )
});

export type UpdateCartInput = TypeOf<typeof updateCartSchema>;
