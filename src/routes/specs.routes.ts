import { Router } from "express";
import {
  setSpecsHandler,
  getSpecsByTypeHandler
} from "../controller/specs.controller";

export const specsRouter = Router();

specsRouter.post("/:type", setSpecsHandler);
specsRouter.get("/:type", getSpecsByTypeHandler);
