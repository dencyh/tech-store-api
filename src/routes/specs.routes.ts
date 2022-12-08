import { Router } from "express";
import { createSpecsHandler } from "../controller/specs.controller";

export const specsRouter = Router();

specsRouter.post("/", createSpecsHandler);
