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
};

export const getNotificaciones = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.any(
      `SELECT *
      FROM notificacion
      WHERE idreceptor = $1`,
      [id]
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateNotificacion = async (req, res, next) => {
  try {
    const { id } = req.params;

    const notificacion = await db.oneOrNone(
      `SELECT *
      FROM notificacion
      WHERE idnotificacion = $1`,
      [id]
    );

    if (!notificacion) {
      return res.status(404).json({ message: "Notificacion no encontrada" });
    }

    const result = await db.result(
      `UPDATE notificacion
      SET leido = true
      WHERE idnotificacion = $2`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Notificacion no encontrada" });
    }

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
