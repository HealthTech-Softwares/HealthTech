import dotenv from "dotenv";

dotenv.config();
export const TOKEN_SECRET = "mytoken";

export const FRONTEND_URL = process.env.FRONTEND_URL;
export const PORT = 4000;
export const DB_HOST = process.env.DB_HOST;
export const DB_URL = process.env.DB_URL;
export const DB_PORT = process.env.DB_PORT;
export const DB_NAME = process.env.DB_NAME;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
