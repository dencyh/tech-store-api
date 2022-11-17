import { LaptopSpecs } from "./laptop.specs";
import { SmartPhoneSpecs } from "./smartphone.specs.";

type ProductColor =
  | "белый"
  | "желтый"
  | "зеленый"
  | "золотой"
  | "коричневый"
  | "розовый"
  | "серебристый"
  | "серый"
  | "синий"
  | "фиолетовый"
  | "черный";

type Rating = 1 | 2 | 3 | 4 | 5;

export interface BaseSpecs {
  color: ProductColor;
  brand: string;
  price: number;
  rating: Rating;
  releaseYear: number;
}

export type OneOfSpecs = LaptopSpecs | SmartPhoneSpecs;
