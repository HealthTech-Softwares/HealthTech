import pgPromise from "pg-promise";
import { DATABASE_URL } from "./config.js";

const pgp = pgPromise({});

export const connectDB = async () => {
  try {
    const db = pgp(DATABASE_URL);
    await db.connect();
    console.log("Database is connected");
    return db;
  } catch (error) {
    console.error("Database connection error: ", error);
    throw error;
  }
};
