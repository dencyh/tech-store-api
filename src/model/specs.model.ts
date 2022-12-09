import mongoose from "mongoose";
import { CreateProductInput } from "../schema/products/core.product.schema";

export type BaseSpecs = Omit<
  CreateProductInput,
  "description" | "imagePaths" | "brand" | "category"
>;

export type SpecsVariety<T, S> = {
  [key in keyof T]: T[key] extends S
    ? { [key in keyof S]: S[key][] }
    : T[key][];
};

export type Specs = SpecsVariety<BaseSpecs, BaseSpecs["specs"]>;

export interface SpecsDocument extends mongoose.Document {
  type: string;
  specs: Specs;
  createdAt: Date;
  updatedAt: Date;
}

const specsForTypeSchema = new mongoose.Schema({
  name: [{ type: String, required: true }],
  price: [{ type: Number, required: true }],
  color: [{ type: String, required: true }],
  releaseDate: [{ type: Number, required: true }],
  specs: { type: Object }
});

const specsSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, unique: true },
    specs: specsForTypeSchema
  },
  {
    timestamps: true
  }
);
const SpecsModel = mongoose.model<SpecsDocument>("Specs", specsSchema);

export default SpecsModel;
