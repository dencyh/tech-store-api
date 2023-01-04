import dotenv from "dotenv";
dotenv.config();
import express from "express";
import config from "config";
import cors from "cors";
import rootRouter from "./routes/index";
import logger from "./utils/logger";
import { connectToDb } from "./utils/connectToDb";
import deserializeUser from "./middleware/deserializeUser";
import path from "path";
import cookieParser from "cookie-parser";

const app = express();

const PORT = config.get("port");
const HOST = config.get("host");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);
app.use(
  "/static/category",
  express.static(path.join(__dirname, "../static/category"), {
    maxAge: 31536000
  })
);
app.use(
  "/static/product",
  express.static(path.join(__dirname, "../static/product"))
);

app.use(deserializeUser);

app.use("/api", rootRouter);

async function main() {
  try {
    app.listen(PORT, () =>
      logger.info(`🚀 Server ready at: http://${HOST}:${PORT}`)
    );

    await connectToDb();
  } catch (e) {
    logger.error(e);
  }
}

main();
