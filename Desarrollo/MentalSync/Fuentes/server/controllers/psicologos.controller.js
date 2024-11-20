import db from "../src/db.js";

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

    const result = await db.tx(async (t) => {
      const existeCorreo = await t.oneOrNone(
        "SELECT 1 FROM usuario WHERE correo = $1",
        [correo]
      );
      const existeDni = await t.oneOrNone(
        "SELECT 1 FROM psicologo WHERE dni = $1",
        [dni]
      );

      if (existeCorreo || existeDni) {
        throw new Error(
          existeCorreo
            ? "El correo ingresado ya existe"
            : "El DNI ingresado ya existe"
        );
      }

      const usuario = await t.one(
        `INSERT INTO usuario (rol, correo, contrasenia)
         VALUES ('Psicologo', $1, $2)
         RETURNING idusuario`,
        [correo, contrasenia]
      );

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

      return psicologo;
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getPsicologos = async (req, res, next) => {
  try {
    const result = await db.any(`
      SELECT 
        p.idpsicologo,
        p.nombre,
        p.apellidop,
        p.apellidom,
        p.dni,
        p.foto,
        p.firma,
        p.descripcion,
        p.consulta_online,
        -- Otros campos de psicólogo...
        COALESCE(
          JSON_AGG(
            jsonb_build_object(
              'nombre', e.nombre
            )
          ) FILTER (WHERE e.nombre IS NOT NULL), 
          '[]'
        ) AS especialidades
      FROM psicologo p
      LEFT JOIN especialidad_psicologo ep ON ep.idpsicologo = p.idpsicologo
      LEFT JOIN especialidad e ON e.idespecialidad = ep.idespecialidad
      GROUP BY p.idpsicologo
      ORDER BY p.nombre;
    `);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getPsicologo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.oneOrNone(
      `SELECT * FROM psicologo WHERE idpsicologo = $1`,
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

export const perfilPsicologo = async (req, res, next) => {
  try {
    const idusuario = req.userId;
    const psicologo = await db.oneOrNone(
      `SELECT idpsicologo FROM psicologo WHERE idusuario = $1`,
      [idusuario]
    );

    if (!psicologo) {
      return res.status(404).json({ message: "Psicologo no encontrado" });
    }

    const idpsicologo = psicologo.idpsicologo;

    const result = await db.oneOrNone(
      `SELECT * FROM psicologo WHERE idpsicologo = $1`,
      [idpsicologo]
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

export const updatePsicologo = async (req, res, next) => {
  try {
    const idusuario = req.userId;
    const { disponibilidad, foto, descripcion, consulta_online } = req.body;

    const psicologo = await db.oneOrNone(
      `SELECT idpsicologo FROM psicologo WHERE idusuario = $1`,
      [idusuario]
    );

    if (!psicologo) {
      return res.status(404).json({ message: "Psicologo no encontrado" });
    }

    const idpsicologo = psicologo.idpsicologo;

    const result = await db.result(
      `UPDATE psicologo
      SET disponiblidad = $1, foto = $2, descripcion = $3, consulta_online = $4
      WHERE idpsicologo = $5`,
      [disponibilidad, foto, descripcion, consulta_online, idpsicologo]
    );
    if (result.rowCount === 0)
      return res.status(404).json({ message: "Psicologo no encontrado" });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const updateAllPsicologos = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.result(
      `UPDATE psicologo
      SET ? WHERE idpsicologo = $8`,
      [id]
    );
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
