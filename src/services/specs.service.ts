import { SpecsDocument } from "./../model/specs.model";
import SpecsModel from "../model/specs.model";

export function createSpecs(input: any) {
  return SpecsModel.create(input);
}
