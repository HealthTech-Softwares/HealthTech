import pgPromise from "pg-promise";
import { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } from "./config.js";

const pgp = pgPromise({});

const dbConfig = {
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
};

const db = pgp(dbConfig);

export const connectDB = async () => {
  try {
    await db.connect();
    console.log("Database is connected");
    return db;
  } catch (error) {
    console.error("Database connection error: ", error);
    throw error;
  }
};
