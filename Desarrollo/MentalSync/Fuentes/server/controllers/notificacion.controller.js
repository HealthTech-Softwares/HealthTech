import db from "../src/db.js";

export const getNotificacionesPsicologo = async (req, res, next) => {
  try {
    const idusuario = req.userId;

    const psicologo = await db.oneOrNone(
      `SELECT idpsicologo FROM psicologo WHERE idusuario = $1`,
      [idusuario]
    );

    const idpsicologo = psicologo.idpsicologo;

    const result = await db.any(
      `SELECT n.idnotificacion, n.titulo, n.mensaje, n.fecha_creacion,
              p.nombre AS paciente_nombre, p.apellidop AS paciente_apellidop
      FROM notificacion n
      INNER JOIN paciente p ON n.idemisor = p.idpaciente
      WHERE n.idreceptor = $1`,
      [idpsicologo]
    );

    if (!result) {
      return res.status(404).json({ message: "No hay notificaciones" });
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getNotificacionesPaciente = async (req, res, next) => {
  try {
    const idusuario = req.userId;

    const paciente = await db.oneOrNone(
      `SELECT idpaciente FROM paciente WHERE idusuario = $1`,
      [idusuario]
    );

    const idpaciente = paciente.idpaciente;

    const result = await db.any(
      `SELECT n.idnotificacion, n.titulo, n.mensaje, n.fecha_creacion,
              p.nombre AS psicologo_nombre, p.apellidop AS psicologo_apellidop
      FROM notificacion n
      INNER JOIN psicologo p ON n.idemisor = p.idpsicologo
      WHERE n.idreceptor = $1`,
      [idpaciente]
    );

    if(!result) {
      return res.status(404).json({ message: "No hay notificaciones" });
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

