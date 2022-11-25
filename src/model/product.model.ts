import { string } from "zod";
import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { CategoryDocument } from "./category.model";
import { TypeDocument } from "./type.model";
import {
  CreateProductInput,
  ProductColor,
  productTypeSchemas
} from "../schema/products/core.product.schema";
import { BrandDocument } from "./brand.model";

export interface ProductDocument extends mongoose.Document {
  type: keyof typeof productTypeSchemas;
  name: string;
  price: number;
  category: CategoryDocument["_id"];
  brand: BrandDocument["_id"];
  color: ProductColor;
  releaseDate: number;
  description: string;
  imagePaths?: string[];
  spec: Partial<CreateProductInput>;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
    color: { type: String, required: true, default: "черный" },
    releaseDate: { type: Number, required: true },
    imagePaths: { type: Array, default: [] },
    specs: { type: Object, required: true }
  },
  {
    timestamps: true
  }
);
const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);

export default ProductModel;
