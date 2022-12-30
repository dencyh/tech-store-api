import { CreateAddressInput } from "./../schema/address.schema";
import AddressModel from "../model/address.model";

export function createAddress(userId: string, address: CreateAddressInput) {
  return AddressModel.create({ userId, address });
}

export function getUserAddresses(userId: string) {
  return AddressModel.find({ userId });
}
