import db from "../src/db.js";

export const createPaciente = async (req, res, next) => {
  try {
    const { correo, contrasenia, nombre, apellidop, apellidom, dni, genero } =
      req.body;

    const result = await db.tx(async (t) => {
      // Verificamos si existe el correo y el DNI
      const existeCorreo = await t.oneOrNone(
        "SELECT 1 FROM usuario WHERE correo = $1",
        [correo]
      );

      if (existeCorreo) {
        return res.status(400).json({ message: "El correo ingresado ya existe" });
      }

      const existeDni = await t.oneOrNone(
        "SELECT 1 FROM paciente WHERE dni = $1",
        [dni]
      );

      // Si existe el correo o el DNI, retornamos un mensaje de error
      if (existeDni) {
        return res.status(400).json({ message: "El DNI ingresado ya existe" });
      }

      // Insertamos en la tabla usuario y obtenemos el id generado
      const usuario = await t.one(
        `INSERT INTO usuario (rol, correo, contrasenia)
         VALUES ('Paciente', $1, $2)
         RETURNING idusuario`,
        [correo, contrasenia]
      );

      // Insertamos en la tabla paciente usando el id de usuario recién generado
      const paciente = await t.one(
        `INSERT INTO paciente (idusuario, nombre, apellidop, apellidom, dni, genero)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING idpaciente`,
        [usuario.idusuario, nombre, apellidop, apellidom, dni, genero]
      );

      // Retornamos el ID del paciente
      return paciente;
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getPacientes = async (req, res, next) => {
  try {
    const pacientes = await db.any(
      `SELECT *
      FROM paciente`
    );

    if (!pacientes) {
      return res.status(404).json({ message: "Pacientes no encontrados" });
    }

    res.json(pacientes);
  } catch (error) {
    next(error);
  }
};

export const getPaciente = async (req, res, next) => {
  try {
    const idusuario = req.userId;
    const paciente = await db.oneOrNone(
      `SELECT idpaciente FROM paciente WHERE idusuario = $1`,
      [idusuario]
    );

    if (!paciente) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    const idpaciente = paciente.idpaciente;

    const result = await db.oneOrNone(
      `SELECT p.*, u.correo, u.contrasenia
      FROM paciente p
      INNER JOIN usuario u ON p.idusuario = u.idusuario
      WHERE p.idpaciente = $1`,
      [idpaciente]
    );
    if (!result) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updatePaciente = async (req, res) => {
  try {
    const idusuario = req.userId;
    const { correo, contrasenia } = req.body;

    const paciente = await db.oneOrNone(
      `SELECT idpaciente FROM paciente WHERE idusuario = $1`,
      [idusuario]
    );

    if (!paciente) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    if (correo) {
      const correoExistente = await db.oneOrNone(
        `SELECT 1 FROM usuario WHERE correo = $1 AND idusuario != $2`,
        [correo, idusuario]
      );

      if (correoExistente) {
        return res.status(400).json({ message: "Otro usuario ya tiene en uso este correo" });
      }
    }

    const result = await db.one(
      `UPDATE usuario SET 
        correo = COALESCE($1, correo), 
        contrasenia = COALESCE($2, contrasenia)
      WHERE idusuario = $3
      RETURNING idusuario, correo`,
      [correo, contrasenia, idusuario]
    );

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Hubo un error al actualizar el usuario");
  }
};
