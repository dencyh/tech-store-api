import { BaseSpecs } from "./base.specs";

export interface LaptopSpecs extends BaseSpecs {
  name: "laptop";
  os: string;
  screenSize: number;
  resolution: [number, number];
  refreshRate: number;
  cpu: string;
  cpuCores: number;
  ram: number;
  gpu: string;
  vram: number;
  storageCapacity: number;
  batteryLife: number;
}
