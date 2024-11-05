import { connectDB } from "../src/db.js";

export const getEspecialidades = async (req, res, next) => {
  try {
    const db = await connectDB();
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
    const db = await connectDB();
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
