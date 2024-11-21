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
