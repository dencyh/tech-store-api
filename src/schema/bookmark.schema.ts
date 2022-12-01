import { array, number, object, string, TypeOf } from "zod";

export const bookmarkParamsSchema = object({
  params: object({
    userId: string({
      required_error: "User id is required to identify the cart"
    })
  })
});
export type BookmarkParamsInput = TypeOf<typeof bookmarkParamsSchema>["params"];

export const updateBookmarkSchema = object({
  params: object({
    userId: string({
      required_error: "User id is required to identify the bookmarks"
    })
  }),
  body: object({
    products: array(string({ required_error: "Product ID is required" }))
  })
});
export type UpdateBookmarkInput = TypeOf<typeof updateBookmarkSchema>["body"];
