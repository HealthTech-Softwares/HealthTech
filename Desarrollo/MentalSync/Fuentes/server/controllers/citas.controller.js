import db from "../src/db.js";
import moment from "moment";

export const createCita = async (req, res, next) => {
  try {
    const idusuario = req.userId;
    const {
      idpsicologo,
      idhorario,
      online,
      motivo,
    } = req.body;

    const paciente = await db.oneOrNone(
      `SELECT idpaciente FROM paciente WHERE idusuario = $1`,
      [idusuario]
    );

    const idpaciente = paciente.idpaciente;

    const horario = await db.oneOrNone(
      `SELECT t.hora_inicio, h.dia
      FROM horario h
      INNER JOIN turno t ON h.idturno = t.idturno
      WHERE h.idhorario = $1`,
      [idhorario]
    );

    const { hora_inicio, dia } = horario;
    const diaLowerCase = dia.toLowerCase();

    const diasSemana = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    const diaSemana = diasSemana.indexOf(diaLowerCase);

    if (diaSemana === -1) {
      return res.status(400).json({ message: "Día de la semana no válido" });
    }

    const fecha = moment().day(diaSemana).isBefore(moment()) ? moment().day(diaSemana + 7) : moment().day(diaSemana);

    const result = await db.one(
      `INSERT INTO cita (idpaciente, idpsicologo, idhorario, fecha, hora, online, motivo)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING idcita, idpaciente, idpsicologo, idhorario, to_char(fecha, 'DD/MM/YYYY') as fecha, hora, online, motivo`,
      [
        idpaciente,
        idpsicologo,
        idhorario,
        fecha.format("YYYY-MM-DD"),
        hora_inicio,
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
    const idusuario = req.userId;

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
    const idusuario = req.userId;

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

export const getPacientesPsicologo = async (req, res, next) => {
  try {
    const idusuario = req.userId;

    const psicologo = await db.oneOrNone(
      `SELECT idpsicologo FROM psicologo WHERE idusuario = $1`,
      [idusuario]
    );

    const idpsicologo = psicologo.idpsicologo;

    const result = await db.any(
      `SELECT p.idpaciente, c.idcita, p.foto, p.nombre, p.apellidop, p.apellidom, p.dni, to_char(c.fecha, 'DD/MM/YYYY') as fecha, c.estado
      FROM paciente p
      INNER JOIN (
        SELECT DISTINCT ON (c.idpaciente) c.idcita, c.idpaciente, c.fecha, c.estado
        FROM cita c
        WHERE c.idpsicologo = $1
        ORDER BY c.idpaciente, c.fecha DESC
      ) AS c ON p.idpaciente = c.idpaciente
      ORDER BY c.fecha DESC`,
      [idpsicologo]
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getCitasPacientePsicologo = async (req, res, next) => {
  try {
    const idusuario = req.userId;
    const { idpaciente } = req.params;

    const psicologo = await db.oneOrNone(
      `SELECT idpsicologo FROM psicologo WHERE idusuario = $1`,
      [idusuario]
    );

    const idpsicologo = psicologo.idpsicologo;

    const result = await db.any(
      `SELECT c.idcita, idpaciente, to_char(c.fecha, 'DD/MM/YYYY') as fecha, c.hora, c.estado, 
        c.motivo, c.comentario, COALESCE(d.nombre, 'No hay diagnostico') as diagnostico
      FROM cita c
      LEFT JOIN diagnostico d ON c.iddiagnostico = d.iddiagnostico
      WHERE c.idpsicologo = $1 AND c.idpaciente = $2`,
      [idpsicologo, idpaciente]
    );

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
