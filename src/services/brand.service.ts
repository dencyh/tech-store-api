import { BrandDocument } from "./../model/brand.model";
import BrandModel from "../model/brand.model";

export function createBrand(input: Partial<BrandDocument>) {
  return BrandModel.create(input);
}

export function findBrandByName(name: string) {
  return BrandModel.findOne({ name });
}

export function findBrandsByType(type: string) {
  return BrandModel.find({ types: type });
}
