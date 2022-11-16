import mongoose from "mongoose";

export interface CategoryDocument extends mongoose.Document {
  name: string;
  imagePath: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    imagePath: { type: String, required: true }
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
