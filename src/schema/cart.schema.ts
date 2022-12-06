import { array, number, object, string, TypeOf } from "zod";

export const cartParamsSchema = object({
  params: object({
    userId: string({
      required_error: "User id is required to identify the cart"
    })
  })
});
export type CartParamsInput = TypeOf<typeof cartParamsSchema>["params"];

export const updateCartSchema = object({
  params: object({
    userId: string({
      required_error: "User id is required to identify the cart"
    })
  }),
  body: object({
    products: array(
      object({
        product: string({ required_error: "Product ID is required" }),
        quantity: number({
          required_error: "Specify the quantity of the product"
        })
      })
    )
  })
});
export type UpdateCartInput = TypeOf<typeof updateCartSchema>["body"];

export const getCartProductsSchema = object({
  body: object({
    ids: array(string())
  })
});
export type GetCartProductsInput = TypeOf<typeof getCartProductsSchema>["body"];
