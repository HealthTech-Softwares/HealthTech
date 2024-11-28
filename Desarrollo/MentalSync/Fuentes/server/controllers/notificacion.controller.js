import db from "../src/db.js";

export const getNotificacionesPsicologo = async (req, res, next) => {
  try {
    const idusuario = req.userId;

    const psicologo = await db.oneOrNone(
      `SELECT idpsicologo FROM psicologo WHERE idusuario = $1`,
      [idusuario]
    );

    const result = await db.any(
      `SELECT n.idnotificacion, n.titulo, n.mensaje, to_char(n.fecha_creacion, 'DD/MM/YYYY') as fecha_creacion,
          p.nombre AS paciente_nombre, p.apellidop AS paciente_apellidop
      FROM notificacion n
      INNER JOIN usuario u ON n.idemisor = u.idusuario
      INNER JOIN paciente p ON u.idusuario = p.idusuario
      WHERE n.idreceptor = $1`,
      [idusuario]
    );

    if (result.length === 0) {
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

    const result = await db.any(
      `SELECT n.idnotificacion, n.titulo, n.mensaje, to_char(n.fecha_creacion, 'DD/MM/YYYY') as fecha_creacion,
          p.nombre AS psicologo_nombre, p.apellidop AS psicologo_apellidop
      FROM notificacion n
      INNER JOIN usuario u ON n.idemisor = u.idusuario
      INNER JOIN psicologo p ON u.idusuario = p.idusuario
      WHERE n.idreceptor = $1`,
      [idusuario]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "No hay notificaciones" });
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

