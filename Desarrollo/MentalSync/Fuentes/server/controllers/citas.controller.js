import db from "../src/db.js";

export const createCita = async (req, res, next) => {
  try {
    const { idusuario } = req.userId;
    const {
      idpsicologo,
      idhorario,
      fecha,
      hora,
      online,
      motivo,
    } = req.body;

    const paciente = await db.oneOrNone(
      `SELECT idpaciente FROM paciente WHERE idusuario = $1`,
      [idusuario]
    );

    const idpaciente = paciente.idpaciente;

    const result = await db.one(
      `INSERT INTO cita (idpaciente, idpsicologo, idhorario, fecha, hora, online, motivo) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        idpaciente,
        idpsicologo,
        idhorario,
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
    const { idusuario } = req.userId;

    const paciente = await db.oneOrNone(
      `SELECT idpaciente FROM paciente WHERE idusuario = $1`,
      [idusuario]
    );

    const idpaciente = paciente.idpaciente;

    const result = await db.any(
      `SELECT *
      FROM cita
      WHERE idpaciente = $1`,
      [idpaciente]
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
    const { idusuario } = req.userId;

    const psicologo = await db.oneOrNone(
      `SELECT idpsicologo FROM psicologo WHERE idusuario = $1`,
      [idusuario]
    );

    const idpsicologo = psicologo.idpsicologo;

    const result = await db.any(
      `SELECT *
      FROM cita
      WHERE idpsicologo = $1`,
      [idpsicologo]
    );

    if (!result) {
      return res.status(404).json({ message: "Citas no encontradas" });
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getCita = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.one(
      `SELECT *
      FROM cita
      WHERE idcita = $1`,
      [id]
    );

    if (!result) {
      return res.status(404).json({ message: "Cita no encontrada" });
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateCita = async (req, res, next) => {
  try {
    const { idcita } = req.params;
    const {
      iddiagnostico,
      url,
      comentario,
      estado,
    } = req.body;

    const result = await db.one(
      `UPDATE cita
      SET iddiagnostico = $1, url = $2, comentario = $3, estado = $4
      WHERE idcita = $5
      RETURNING *`,
      [
        iddiagnostico,
        url,
        comentario,
        estado,
        idcita,
      ]
    );

    if (!result) {
      return res.status(404).json({ message: "Cita no encontrada" });
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};