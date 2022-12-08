import mongoose from "mongoose";

export interface BrandDocument extends mongoose.Document {
  name: string;
  types: string[];
  createdAt: Date;
  updatedAt: Date;
}

const brandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    types: { type: Array, required: true, default: [] }
  },
  {
    timestamps: true
  }
);
const BrandModel = mongoose.model<BrandDocument>("Brand", brandSchema);

export default BrandModel;
