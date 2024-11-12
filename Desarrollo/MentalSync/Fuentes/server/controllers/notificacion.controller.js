import db from "../db.js";

export const createNotificacion = async (req, res, next) => {
  try {
    const { idemisor, idreceptor, mensaje } = req.body;

    const result = await db.one(
      `INSERT INTO notificacion (idemisor, idreceptor, mensaje) VALUES ($1, $2, $3) RETURNING *`,
      [idemisor, idreceptor, mensaje]
    );

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getTodasNotificaciones = async (res, next) => {
  try {
    const result = await db.any(
      `SELECT *
      FROM notificacion`
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
}