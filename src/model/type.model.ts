import mongoose from "mongoose";

export interface TypeDocument extends mongoose.Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const typeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }
  },
  {
    timestamps: true
  }
);
const TypeModel = mongoose.model<TypeDocument>("Type", typeSchema);

export default TypeModel;
