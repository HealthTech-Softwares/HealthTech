import db from "../src/db.js";
import moment from "moment";
import { notifyPsychologist, getUserIdForPsychologist } from '../websocket.js';

export const createCita = async (req, res, next) => {
    try {
        const idusuario_paciente_creador = req.userId;
        const {
            idpsicologo,
            idhorario,
            online,
            motivo,
        } = req.body;

        const paciente = await db.oneOrNone(
            `SELECT idpaciente, nombre, apellidop FROM paciente WHERE idusuario = $1`,
            [idusuario_paciente_creador]
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

        console.log(`[createCita] Verificando horario. Recibido idhorario: ${idhorario}, Tipo: ${typeof idhorario}`);

        const idHorarioNumerico = parseInt(idhorario, 10);
        if (isNaN(idHorarioNumerico)) {
             return res.status(400).json({ message: "ID de horario inválido (no es número)." });
        }

        const horario = await db.oneOrNone(
            `SELECT t.hora_inicio, h.dia FROM horario h INNER JOIN turno t ON h.idturno = t.idturno WHERE h.idhorario = $1`,
            [idHorarioNumerico]
        );
        if (!horario) {
            console.error(`[createCita] Horario no encontrado en DB para idhorario (numérico): ${idHorarioNumerico}`);
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

        const resultCitaCreada = await db.one(
            `INSERT INTO cita (idpaciente, idpsicologo, idhorario, fecha, hora, online, motivo)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING idcita, to_char(fecha, 'DD/MM/YYYY') as fecha_formateada, to_char(hora, 'HH12:MI AM') as hora_formateada`,
            [
                idpaciente,
                idpsicologo,
                idHorarioNumerico, // Usar la variable numérica aquí también
                fecha.format("YYYY-MM-DD"),
                hora_inicio,
                online,
                motivo,
            ]
        );

        const idusuario_psicologo = await getUserIdForPsychologist(idpsicologo);

        if (idusuario_psicologo) {
            console.log(`[createCita] Se encontró idusuario ${idusuario_psicologo} para idpsicologo ${idpsicologo}.`);

            const nombrePacienteCompleto = `${paciente.nombre} ${paciente.apellidop}`;
            const mensajeDB = `Nueva cita con ${nombrePacienteCompleto} para el ${resultCitaCreada.fecha_formateada} a las ${resultCitaCreada.hora_formateada}. Motivo: ${motivo}`;
            const tituloDB = `Nueva cita programada`;
            try {
                await db.none(
                    `INSERT INTO notificacion (idemisor, idreceptor, titulo, mensaje) VALUES ($1, $2, $3, $4)`,
                    [idusuario_paciente_creador, idusuario_psicologo, tituloDB, mensajeDB]
                );
                console.log(`[createCita] Notificación en DB creada para psicólogo (usuario ID ${idusuario_psicologo})`);
            } catch (dbNotifyError) {
                console.error("[createCita] Error al guardar notificación en DB:", dbNotifyError);
            }

            const notificationPayload = {
                idcita: resultCitaCreada.idcita,
                pacienteNombre: nombrePacienteCompleto,
                fecha: resultCitaCreada.fecha_formateada,
                hora: resultCitaCreada.hora_formateada,
                motivo: motivo,
                online: online,
                timestamp: new Date().toISOString()
            };

            await notifyPsychologist(idusuario_psicologo, notificationPayload);

        } else {
            console.warn(`[createCita] No se pudo encontrar el idusuario para el psicólogo con idpsicologo ${idpsicologo}. No se envió notificación WS.`);
        }

        return res.status(201).json({
            message: "Cita creada exitosamente",
            cita: resultCitaCreada
        });

    } catch (error) {
        console.error("Error detallado en createCita:", error);
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
        if (!paciente) {
             return res.status(404).json({ message: "Paciente no encontrado para este usuario." });
        }

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

        if (!result || result.length === 0) {
            return res.json([]);
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
         if (!psicologo) {
             return res.status(404).json({ message: "Psicólogo no encontrado para este usuario." });
         }

        const idpsicologo = psicologo.idpsicologo;

        const result = await db.any(
            `SELECT c.idcita, to_char(c.fecha, 'DD/MM/YYYY') as fecha, c.motivo, to_char(c.hora, 'HH12:MI AM') as hora, c.comentario, c.estado,
                    p.idpaciente, p.nombre as paciente_nombre, p.apellidop as paciente_apellidop,
                    COALESCE(d.nombre, 'Sin diagnostico disponible') as diagnostico_nombre
            FROM cita c
            INNER JOIN paciente p ON c.idpaciente = p.idpaciente
            LEFT JOIN diagnostico d ON c.iddiagnostico = d.iddiagnostico
            WHERE c.idpsicologo = $1`,
            [idpsicologo]
        );

        if (!result || result.length === 0) {
             return res.json([]);
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
                    p.nombre as nombre_paciente, p.apellidop as apellidop_paciente, p.dni as dni_paciente, p.foto as foto_paciente,
                    ps.nombre as nombre_psicologo, ps.dni as dni_psicologo, ps.apellidop as apellidop_psicologo, ps.foto as foto_psicologo
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
            return res.json([]);
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
        if (!psicologo) {
            return res.status(404).json({ message: "Psicólogo no encontrado para este usuario." });
        }

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
        if (!psicologo) {
            return res.status(404).json({ message: "Psicólogo no encontrado para este usuario." });
        }

        const idpsicologo = psicologo.idpsicologo;

        const result = await db.any(
            `SELECT p.idpaciente, c.idcita, p.foto, p.nombre, p.apellidop, p.apellidom, p.dni, to_char(c.fecha, 'DD/MM/YYYY') as fecha, c.estado
            FROM paciente p
            INNER JOIN (
                SELECT DISTINCT ON (c.idpaciente) c.idcita, c.idpaciente, c.fecha, c.estado
                FROM cita c
                WHERE c.idpsicologo = $1
                ORDER BY c.idpaciente, c.fecha DESC, c.idcita DESC
            ) AS c ON p.idpaciente = c.idpaciente
            ORDER BY c.fecha DESC, p.apellidop ASC`,
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
        if (!psicologo) {
            return res.status(404).json({ message: "Psicólogo no encontrado para este usuario." });
        }

        const idpsicologo = psicologo.idpsicologo;

        const result = await db.any(
            `SELECT c.idcita, c.idpaciente, to_char(c.fecha, 'DD/MM/YYYY') as fecha, to_char(c.hora, 'HH12:MI AM') as hora, c.estado,
                    c.motivo, c.comentario, COALESCE(d.nombre, 'No hay diagnostico') as diagnostico
            FROM cita c
            LEFT JOIN diagnostico d ON c.iddiagnostico = d.iddiagnostico
            WHERE c.idpsicologo = $1 AND c.idpaciente = $2
            ORDER BY c.fecha DESC, c.hora DESC`,
            [idpsicologo, idpaciente]
        );
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const updateCita = async (req, res, next) => {
    try {
        const idusuario_psicologo_actualizador = req.userId;
        const { idcita } = req.params;
        const {
            iddiagnostico,
            comentario,
            estado,
        } = req.body;

        const psicologo = await db.oneOrNone(
            `SELECT idpsicologo FROM psicologo WHERE idusuario = $1`,
            [idusuario_psicologo_actualizador]
        );

        if (!psicologo) {
            return res.status(403).json({ message: "Acción no permitida para este usuario." });
        }
        const idpsicologo_verificado = psicologo.idpsicologo;

        const cita = await db.oneOrNone(
            `SELECT c.idpaciente, p.idusuario AS idusuario_paciente, c.idpsicologo
            FROM cita c
            INNER JOIN paciente p ON c.idpaciente = p.idpaciente
            WHERE c.idcita = $1`,
            [idcita]
        );

        if (!cita) {
            return res.status(404).json({ message: "Cita no encontrada" });
        }

        if (cita.idpsicologo !== idpsicologo_verificado) {
             return res.status(403).json({ message: "Este psicólogo no está autorizado para modificar esta cita." });
        }

        const idpaciente = cita.idpaciente;
        const idusuario_paciente = cita.idusuario_paciente;

        const result = await db.one(
            `UPDATE cita
            SET iddiagnostico = $1, comentario = $2, estado = $3
            WHERE idcita = $4
            RETURNING *`,
            [
                // Convertir a null si es undefined o vacío para la BD
                iddiagnostico || null,
                comentario || null,
                estado,
                idcita,
            ]
        );

        const diagnostico = await db.oneOrNone(
            `SELECT nombre FROM diagnostico WHERE iddiagnostico = $1`,
            [iddiagnostico]
        );

        const diagnosticoNombre = diagnostico ? diagnostico.nombre : "Sin diagnóstico asignado";

        const mensaje = estado === 'Realizado'
            ? `Tu cita del ${moment(result.fecha).format('DD/MM/YYYY')} ha sido marcada como realizada. Diagnóstico: ${diagnosticoNombre}. Comentario: ${comentario || 'Ninguno'}.`
            : estado === 'Ausente'
            ? `Tu cita del ${moment(result.fecha).format('DD/MM/YYYY')} ha sido marcada como ausente.`
            : `El estado de tu cita del ${moment(result.fecha).format('DD/MM/YYYY')} ha sido actualizado a '${estado}'.`;

        const titulo = `Actualización de tu cita`;

        try {
            await db.none(
                `INSERT INTO notificacion (idemisor, idreceptor, titulo, mensaje) VALUES ($1, $2, $3, $4)`,
                [idusuario_psicologo_actualizador, idusuario_paciente, titulo, mensaje]
            );
            console.log(`[updateCita] Notificación DB creada para paciente ${idusuario_paciente}`);
        } catch (dbNotifyError) {
             console.error("[updateCita] Error al guardar notificación para paciente en DB:", dbNotifyError);
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error("Error detallado en updateCita:", error);
        next(error);
    }
};
