import { connectDB } from "../src/db.js";

export const getTurnos = async (req, res, next) => {
  try {
    const db = await connectDB();
    const result = await db.any(
      `SELECT idturno, hora_inicio, hora_fin
      FROM turno;`
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};
