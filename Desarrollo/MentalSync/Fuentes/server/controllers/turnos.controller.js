import db from "../src/db.js";

export const createTurnoPsicologo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { idturno, dia } = req.body;
    const result = await db.one(
      `INSERT INTO horario (idpsicologo, idturno, dia)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [id, idturno, dia]
    );
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getTurnos = async (req, res, next) => {
  try {
    const result = await db.any(
      `SELECT idturno, hora_inicio, hora_fin
      FROM turno;`
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getTurnoPsicologo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.any(
      `SELECT h.dia, t.hora_inicio, t.hora_fin
      FROM psicologo p
      INNER JOIN horario h ON h.idpsicologo = p.idpsicologo
      INNER JOIN turno t ON t.idturno = h.idturno
      WHERE p.idpsicologo = $1 AND
      h.disponible = true`,
      [id]
    );
    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "Psicologo no cuenta con turnos" });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
