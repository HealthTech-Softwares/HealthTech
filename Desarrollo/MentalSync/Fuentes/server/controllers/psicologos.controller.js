import { connectDB } from "../src/db.js";

export const createPsicologo = async (req, res, next) => {
  try {
    const {
      correo,
      contrasenia,
      nombre,
      apellidop,
      apellidom,
      dni,
      foto,
      firma,
      sede,
    } = req.body;

    const db = await connectDB();

    const result = await db.tx(async (t) => {
      // Verificamos si existe el correo y el DNI
      const existeCorreo = await t.oneOrNone(
        "SELECT 1 FROM usuario WHERE correo = $1",
        [correo]
      );
      const existeDni = await t.oneOrNone(
        "SELECT 1 FROM psicologo WHERE dni = $1",
        [dni]
      );

      // Si existe el correo o el DNI, retornamos un mensaje de error
      if (existeCorreo || existeDni) {
        throw new Error(
          existeCorreo
            ? "El correo ingresado ya existe"
            : "El DNI ingresado ya existe"
        );
      }

      // Insertamos en la tabla usuario y obtenemos el id generado
      const usuario = await t.one(
        `INSERT INTO usuario (rol, correo, contrasenia)
         VALUES ('Psicologo', $1, $2)
         RETURNING idusuario`,
        [correo, contrasenia]
      );

      // Insertamos en la tabla psicologo usando el id de usuario recién generado
      const psicologo = await t.one(
        `INSERT INTO psicologo (idusuario, nombre, apellidop, apellidom, dni, foto, firma, sede)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING idpsicologo`,
        [
          usuario.idusuario,
          nombre,
          apellidop,
          apellidom,
          dni,
          foto,
          firma,
          sede,
        ]
      );

      // Retornamos el ID del psicólogo
      return psicologo;
    });

    // Respondemos con los datos del nuevo psicólogo
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getPsicologos = async (req, res, next) => {
  try {
    const db = await connectDB();
    const result = await db.any(
      `SELECT idpsicologo, foto, nombre, apellidop, apellidom, dni
      FROM psicologo
      LIMIT 100;`
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getPsicologo = async (req, res, next) => {
  try {
    const db = await connectDB();
    const { id } = req.params;
    const result = await db.oneOrNone(
      `SELECT foto, nombre, apellidop, apellidom, dni
      WHERE idpsicologo = $1`,
      [id]
    );
    if (!result) {
      return res.status(404).json({ message: "Psicologo no encontrado" });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deletePsicologo = async (req, res, next) => {
  try {
    const db = await connectDB();
    const { id } = req.params;
    const result = await db.result(
      `DELETE FROM psicologo
      WHERE idpsicologo = $1`,
      [id]
    );
    if (result.rowCount === 0)
      return res.status(404).json({ message: "Psicologo no encontrado" });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
