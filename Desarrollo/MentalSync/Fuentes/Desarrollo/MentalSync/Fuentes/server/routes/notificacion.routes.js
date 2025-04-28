import { Router } from "express";
import {
  getNotificacionesPaciente,
  getNotificacionesPsicologo
} from "../controllers/notificacion.controller.js";
import { verifyToken, isPsicologo, isPaciente } from "../libs/auth.middleware.js";

const router = Router();

router.get("/notificaciones_paciente", verifyToken, isPaciente, getNotificacionesPaciente);
router.get("/notificaciones_psicologo", verifyToken, isPsicologo, getNotificacionesPsicologo);

export default router;
