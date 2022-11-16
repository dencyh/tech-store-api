import { BaseSpecs } from "./base.specs";

type Biometrics = "faceId" | "touchId";

export interface SmartPhoneSpecs extends BaseSpecs {
  name: "smartphone";
  model: string;
  os: string;
  screenSize: number;
  resolution: [number, number];
  refreshRate: number;
  capacity: number;
  ram: number;
  cellularNetwork: string;
  simCount: number;
  batteryLife: number;
  proccesor: string;
  biometrics: Biometrics[];
}
