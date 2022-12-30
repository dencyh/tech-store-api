import { CreateAddressInput } from "./../schema/address.schema";
import { UserDocument } from "./user.model";
import mongoose from "mongoose";

export interface AddressDocument extends mongoose.Document {
  userId: UserDocument["_id"];
  address: CreateAddressInput;
  createdAt: Date;
  updatedAt: Date;
}

const locationSchema = new mongoose.Schema({
  // _id: { type: String, required: true, unique: true },
  coords: { type: [Number, Number], required: true },
  text: { type: String, required: true },
  country: { type: String, required: true },
  area: { type: String, required: true },
  province: { type: String, required: true },
  locality: { type: String, required: true },
  street: { type: String, required: true },
  house: { type: String, required: true },
  apartment: { type: String, default: "" },
  comment: { type: String, default: "" }
});

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    address: locationSchema
  },
  {
    timestamps: true
  }
);
const AddressModel = mongoose.model<AddressDocument>("Address", addressSchema);

export default AddressModel;
