import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import rootRouter from "./routes/index";
import logger from "./utils/logger";

const app = express();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.use(express.json());
app.use(cors());

app.use("/api", rootRouter);

async function main() {
  try {
    app.listen(PORT, () =>
      logger.info(`🚀 Server ready at: http://${HOST}:${PORT}`)
    );
  } catch (e) {
    logger.error(e);
  }
}

main();
