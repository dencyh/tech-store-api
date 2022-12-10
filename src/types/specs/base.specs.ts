import { LaptopSpecs } from "./laptop.specs";
import { SmartPhoneSpecs } from "./smartphone.specs.";

type Rating = 1 | 2 | 3 | 4 | 5;

export interface BaseSpecs {
  color: string;
  brand: string;
  price: number;
  rating: Rating;
  releaseYear: number;
}

export type OneOfSpecs = LaptopSpecs | SmartPhoneSpecs;
