import db from "../src/db.js";

export const createCita = async (req, res, next) => {
  try {
    const {
      idpaciente,
      idpsicologo,
      idhorario,
      iddiagnostico,
      fecha,
      hora,
      online,
      motivo,
    } = req.body;

    const result = await db.one(
      `INSERT INTO cita (idpaciente, idpsicologo, idhorario, iddiagnostico, fecha, hora, online, motivo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        idpaciente,
        idpsicologo,
        idhorario,
        iddiagnostico,
        fecha,
        hora,
        online,
        motivo,
      ]
    );

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getCitasPaciente = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.any(
      `SELECT *
      FROM cita
      WHERE idpaciente = $1`,
      [id]
    );

    if (!result) {
      return res.status(404).json({ message: "Citas no encontradas" });
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getCitasPsicologo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.any(
      `SELECT *
      FROM cita
      WHERE idpsicologo = $1`,
      [id]
    );

    if (!result) {
      return res.status(404).json({ message: "Citas no encontradas" });
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};
