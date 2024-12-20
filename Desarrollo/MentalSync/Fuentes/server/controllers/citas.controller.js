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

    if (!paciente) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    const idpaciente = paciente.idpaciente;

    const citaPendiente = await db.oneOrNone(
      `SELECT 1 FROM cita WHERE idpaciente = $1 AND idpsicologo = $2 AND estado = 'Pendiente'`,
      [idpaciente, idpsicologo]
    );

    if (citaPendiente) {
      return res.status(400).json({ message: "Ya tienes una cita pendiente con este psicólogo" });
    }

    const horario = await db.oneOrNone(
      `SELECT t.hora_inicio, h.dia
      FROM horario h
      INNER JOIN turno t ON h.idturno = t.idturno
      WHERE h.idhorario = $1`,
      [idhorario]
    );

    if (!horario) {
      return res.status(404).json({ message: "Horario no encontrado" });
    }

    const { hora_inicio, dia } = horario;

    const diaLowerCase = dia.toLowerCase();

    const diasSemana = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    const diaSemana = diasSemana.indexOf(diaLowerCase);

    if (diaSemana === -1) {
      return res.status(400).json({ message: "Día de la semana no válido" });
    }

    const fecha = moment().day(diaSemana).isBefore(moment()) ? moment().day(diaSemana + 7) : moment().day(diaSemana);

    const citaConflicto = await db.oneOrNone(
      `SELECT 1 FROM cita WHERE idpsicologo = $1 AND fecha = $2 AND hora = $3 AND estado = 'Pendiente'`,
      [idpsicologo, fecha.format("YYYY-MM-DD"), hora_inicio]
    );

    if (citaConflicto) {
      return res.status(400).json({ message: "El psicólogo ya tiene este horario ocupado con otro paciente." });
    }

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

    const usuarioPsicologo = await db.oneOrNone(
      `SELECT idusuario FROM psicologo WHERE idpsicologo = $1`,
      [idpsicologo]
    );

    if (!usuarioPsicologo) {
      return res.status(404).json({ message: "Psicólogo no encontrado" });
    }

    const idusuario_psicologo = usuarioPsicologo.idusuario;

    const mensaje = `Nueva cita creada para el ${fecha.format("DD/MM/YYYY")} a las ${hora_inicio}`;
    const titulo = `Nueva cita programada`;
    await db.none(
      `INSERT INTO notificacion (idemisor, idreceptor, titulo, mensaje) VALUES ($1, $2, $3, $4)`,
      [idusuario, idusuario_psicologo, titulo, mensaje]
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
      `SELECT c.idcita, to_char(c.fecha, 'DD/MM/YYYY') as fecha, c.motivo, to_char(c.hora, 'HH12:MI AM') as hora, c.comentario, c.estado,
              p.idpsicologo, p.nombre as psicologo_nombre, p.apellidop as psicologo_apellidop,
              COALESCE(d.nombre, 'Sin diagnostico disponible') as diagnostico_nombre
      FROM cita c
      INNER JOIN psicologo p ON c.idpsicologo = p.idpsicologo
      LEFT JOIN diagnostico d ON c.iddiagnostico = d.iddiagnostico
      WHERE c.idpaciente = $1`,
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
      `SELECT c.idcita, to_char(c.fecha, 'DD/MM/YYYY') as fecha, c.motivo, to_char(c.hora, 'HH12:MI AM') as hora, c.comentario, c.estado,
              p.idpaciente, p.nombre as paciente_nombre, p.apellidop as paciente_apellidop,
              COALESCE(d.nombre, 'Sin diagnostico disponible') as diagnostico_nombre
      FROM cita c
      INNER JOIN paciente p ON c.idpaciente = p.idpaciente
      LEFT JOIN diagnostico d ON c.iddiagnostico = d.iddiagnostico
      WHERE c.idpaciente = $1`,
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
    const result = await db.oneOrNone(
      `SELECT c.idpaciente, c.idcita, c.estado, c.motivo, c.online, c.hora, to_char(c.fecha, 'DD/MM/YYYY') as fecha,
              p.nombre as nombre_paciente, p.apellidop as apellidop_paciente, p.dni as dni_paciente, p.foto as foto_paciente, ps.nombre as nombre_psicologo, ps.dni as dni_psicologo, ps.apellidop as apellidop_psicologo, ps.foto as foto_psicologo
      FROM cita c
      LEFT JOIN paciente p ON c.idpaciente = p.idpaciente
      INNER JOIN psicologo ps ON c.idpsicologo = ps.idpsicologo
      WHERE c.idcita = $1`,
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

export const getDiagnostico = async (req, res, next) => {
  try {
    const result = await db.any(
      `SELECT iddiagnostico, nombre
      FROM diagnostico`
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "No se encontraron diagnósticos" });
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getPacientePsicologo = async (req, res, next) => {
  try {
    const idusuario = req.userId;
    const { idpaciente } = req.params;

    const psicologo = await db.oneOrNone(
      `SELECT idpsicologo FROM psicologo WHERE idusuario = $1`,
      [idusuario]
    );
    const idpsicologo = psicologo.idpsicologo;
    const result = await db.any(
      `SELECT p.foto, p.nombre, p.apellidop, p.apellidom, p.dni, to_char(c.fecha, 'DD/MM/YYYY') as fecha, c.estado
      FROM paciente p
      INNER JOIN (
        SELECT DISTINCT ON (c.idpaciente) c.idcita, c.idpaciente, c.fecha, c.estado
        FROM cita c
        WHERE c.idpsicologo = $1 AND c.idpaciente = $2
        ORDER BY c.idpaciente, c.fecha DESC
      ) AS c ON p.idpaciente = c.idpaciente
      ORDER BY c.fecha DESC
      LIMIT 1`,
      [idpsicologo, idpaciente]
    );

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
      WHERE c.idpsicologo = $1 AND c.idpaciente = $2
      ORDER BY c.fecha DESC`,
      [idpsicologo, idpaciente]
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateCita = async (req, res, next) => {
  try {
    const idusuario = req.userId;
    const { idcita } = req.params;
    const {
      iddiagnostico,
      comentario,
      estado,
    } = req.body;

    const psicologo = await db.oneOrNone(
      `SELECT idpsicologo FROM psicologo WHERE idusuario = $1`,
      [idusuario]
    );

    if (!psicologo) {
      return res.status(404).json({ message: "Psicologo no encontrado" });
    }

    const idpsicologo = psicologo.idpsicologo;

    const cita = await db.oneOrNone(
      `SELECT c.idpaciente, p.idusuario AS idusuario_paciente
      FROM cita c
      INNER JOIN paciente p ON c.idpaciente = p.idpaciente
      WHERE c.idcita = $1`,
      [idcita]
    );

    if (!cita) {
      return res.status(404).json({ message: "Cita no encontrada" });
    }

    const idpaciente = cita.idpaciente;
    const idusuario_paciente = cita.idusuario_paciente;

    const result = await db.one(
      `UPDATE cita
      SET iddiagnostico = $1, comentario = $2, estado = $3
      WHERE idcita = $4
      RETURNING *`,
      [
        iddiagnostico,
        comentario,
        estado,
        idcita,
      ]
    );

    if (!result) {
      return res.status(404).json({ message: "Cita no encontrada" });
    }

    const diagnostico = await db.oneOrNone(
      `SELECT nombre FROM diagnostico WHERE iddiagnostico = $1`,
      [iddiagnostico]
    );

    const diagnosticoNombre = diagnostico ? diagnostico.nombre : "Sin diagnóstico";

    const mensaje = `Se le ha diagnosticado con ${diagnosticoNombre}. El psicólogo comenta también: ${comentario}`;
    const titulo = `Diagnostico de cita generado`;
    await db.none(
      `INSERT INTO notificacion (idemisor, idreceptor, titulo, mensaje) VALUES ($1, $2, $3, $4)`,
      [idusuario, idusuario_paciente, titulo, mensaje]
    );

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};