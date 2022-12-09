import { Router } from "express";
import {
  setSpecsHandler,
  getSpecsByTypeHandler
} from "../controller/specs.controller";

export const specsRouter = Router();

specsRouter.post("/", setSpecsHandler);
specsRouter.get("/:type", getSpecsByTypeHandler);
