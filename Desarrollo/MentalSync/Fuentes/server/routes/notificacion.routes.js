import { Router } from "express";
import {
  createNotificacion,
  getTodasNotificaciones,
  getNotificaciones,
  updateNotificacion
} from "../controllers/notificacion.controller";
import { verifyToken, isAdmin, hasRole } from "../libs/auth.middleware";

const router = Router();

router.post("/notificacion", createNotificacion);
router.get("/notificaciones", verifyToken, isAdmin, getTodasNotificaciones);
router.get("/notificaciones/:id", verifyToken, hasRole("Administrador", "Paciente", "Medico"), getNotificaciones);
router.put("/notificacion/:id", updateNotificacion);

export default router;
