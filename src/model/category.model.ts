import mongoose from "mongoose";

export interface CategoryDocument extends mongoose.Document {
  title: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true }
  },
  {
    timestamps: true
  }
);
const CategoryModel = mongoose.model("Category", categorySchema);

export default CategoryModel;
