import pgPromise from "pg-promise";
import { DB_URL } from "./config.js";

const pgp = pgPromise({
  error: (error, e) => {
    console.error("Database error:", error);
  },
});

// Trabajar DB en remoto
const dbConfig = {
  connectionString: DB_URL,
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
  keepAlive: true,
};

const db = pgp(dbConfig);

export default db;
/*
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
*/
