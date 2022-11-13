import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

export async function connectToDb() {
  const dbUri = config.get<string>("dbUri");

  try {
    await mongoose.connect(dbUri);
    logger.info("🗄️  Connected to DB");
  } catch (e) {
    logger.error("❌ DB connection failed");
    process.exit(1);
  }
}
