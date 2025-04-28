import db from "../src/db.js";

export const createTurnoPsicologo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { idturno, dia } = req.body;
    const result = await db.one(
      `INSERT INTO horario (idpsicologo, idturno, dia)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [id, idturno, dia]
    );
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getTurnos = async (req, res, next) => {
  try {
    const result = await db.any(
      `SELECT idturno, hora_inicio, hora_fin
      FROM turno;`
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getTurnoPsicologo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.any(
      `SELECT h.dia, t.hora_inicio, t.hora_fin
      FROM psicologo p
      INNER JOIN horario h ON h.idpsicologo = p.idpsicologo
      INNER JOIN turno t ON t.idturno = h.idturno
      WHERE p.idpsicologo = $1 AND
      h.disponible = true`,
      [id]
    );
    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "Psicologo no cuenta con turnos" });
    }

    const turnosPorDia = result.reduce((acc, turno) => {
      const { dia, hora_inicio, hora_fin } = turno;
      if (!acc[dia]) {
        acc[dia] = [];
      }
      acc[dia].push({ hora_inicio, hora_fin });
      return acc;
    }, {});
    
    const turnosAgrupados = Object.keys(turnosPorDia).map(dia => ({
      dia,
      turnos: turnosPorDia[dia]
    }));

    res.json(turnosAgrupados);
  } catch (error) {
    next(error);
  }
};

export const getTurnosFaltantesPsicologo = async (req, res, next) => {
  try {
    const idusuario = req.userId;
    const { dia } = req.body;
    const psicologo = await db.oneOrNone(
      `SELECT * FROM psicologo WHERE idusuario = $1`,
      [idusuario]
    );

    if (!psicologo) {
      return res.status(404).json({ message: "Psicologo no encontrado" });
    }

    const idpsicologo = psicologo.idpsicologo;

    const result = await db.any(
      `SELECT t.idturno, t.hora_inicio, t.hora_fin
      FROM turno t
      LEFT JOIN horario h
      ON t.idturno = h.idturno
      AND h.idpsicologo = $1
      AND h.dia = $2
      WHERE h.idpsicologo IS NULL`,
      [idpsicologo, dia]
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateTurnoPsicologo = async (req, res, next) => {
  try {
    const idusuario = req.userId;
    const { horarios } = req.body;

    const psicologo = await db.oneOrNone(
      `SELECT idpsicologo FROM psicologo WHERE idusuario = $1`,
      [idusuario]
    );

    if (!psicologo) {
      return res.status(404).json({ message: "Psicologo no encontrado" });
    }

    const idpsicologo = psicologo.idpsicologo;

    await db.tx(async t => {
      for (const { idturno, dia_semana } of horarios) {
        const turno = await t.oneOrNone(
          `SELECT idturno FROM turno WHERE idturno = $1`,
          [idturno]
        );

        if (!turno) {
          throw new Error(`Turno no encontrado: ${idturno}`);
        }

        await t.none(
          `INSERT INTO horario (idpsicologo, idturno, dia)
           VALUES ($1, $2, $3)
           ON CONFLICT (idpsicologo, idturno, dia) DO NOTHING`,
          [idpsicologo, idturno, dia_semana]
        );
      }
    });

    res.json({ message: "Turnos asignados correctamente" });
  } catch (error) {
    next(error);
  }
}