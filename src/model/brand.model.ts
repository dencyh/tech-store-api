import mongoose from "mongoose";

export interface BrandDocument extends mongoose.Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const brandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }
  },
  {
    timestamps: true
  }
);
const BrandModel = mongoose.model<BrandDocument>("Brand", brandSchema);

export default BrandModel;
