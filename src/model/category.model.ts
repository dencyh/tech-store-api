import mongoose from "mongoose";

export interface CategoryDocument extends mongoose.Document {
  name: string;
  path: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true, unique: true },
    image: { type: String, required: true }
  },
  {
    timestamps: true
  }
);
const CategoryModel = mongoose.model<CategoryDocument>(
  "Category",
  categorySchema
);

export default CategoryModel;
