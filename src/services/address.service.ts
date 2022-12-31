import {
  CreateAddressInput,
  UpdateAddressInput
} from "./../schema/address.schema";
import AddressModel, { AddressDocument } from "../model/address.model";

export function createAddress(userId: string, address: CreateAddressInput) {
  return AddressModel.create({ userId, address });
}

export function updateAddress(newAddress: UpdateAddressInput) {
  return AddressModel.findOneAndUpdate(
    { "address._id": newAddress._id },
    { address: newAddress }
  );
}

export function removeAddress(addressId: string) {
  return AddressModel.findOneAndRemove({ "address._id": addressId });
}

export function getUserAddresses(userId: string) {
  return AddressModel.find({ userId });
}
