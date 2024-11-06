import pgPromise from "pg-promise";
// import { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } from "./config.js";
import { DB_URL } from "./config.js";

const pgp = pgPromise({});

/*
// Trabajar DB en local
const dbConfig = {
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
};
*/

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
