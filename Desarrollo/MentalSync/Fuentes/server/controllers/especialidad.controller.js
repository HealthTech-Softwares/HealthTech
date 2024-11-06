import db from "../src/db.js";

export const createEspecialidadPsicologo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { idespecialidad } = req.body;

    // Verificar si ya existe esta especialidad para el psicólogo
    const exists = await db.oneOrNone(
      `SELECT 1 FROM especialidad_psicologo 
       WHERE idpsicologo = $1 AND idespecialidad = $2`,
      [id, idespecialidad]
    );

    if (exists) {
      return res
        .status(400)
        .json({ message: "La especialidad ya está asignada a este psicólogo" });
    }

    // Si no existe, insertar la nueva especialidad
    const result = await db.one(
      `INSERT INTO especialidad_psicologo(idpsicologo, idespecialidad)
       VALUES ($1, $2)
       RETURNING *`,
      [id, idespecialidad]
    );

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getEspecialidades = async (req, res, next) => {
  try {
    const result = await db.any(
      `SELECT idespecialidad, nombre
      FROM especialidad`
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getEspecialidadesPsicologo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.any(
      `SELECT e.nombre
      FROM psicologo p
      INNER JOIN especialidad_psicologo ep ON ep.idpsicologo = p.idpsicologo
      INNER JOIN especialidad e ON e.idespecialidad = ep.idespecialidad
      WHERE ep.idpsicologo = $1`,
      [id]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "Psicologo no encontrado" });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getEspecialidadesFaltantesPsicologo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.any(
      `SELECT e.idespecialidad, e.nombre
       FROM especialidad e
       LEFT JOIN especialidad_psicologo ep 
       ON e.idespecialidad = ep.idespecialidad 
       AND ep.idpsicologo = $1
       WHERE ep.idpsicologo IS NULL`,
      [id]
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};
