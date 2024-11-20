import { Router } from "express";
import {
  createNotificacion,
  getTodasNotificaciones,
  getNotificaciones,
  updateNotificacion
} from "../controllers/notificacion.controller";
import { verifyToken } from "../libs/auth.middleware";

const router = Router();

router.post("/notificacion", createNotificacion);
router.get("/notificaciones", verifyToken, getTodasNotificaciones);
router.get("/notificaciones/:id", verifyToken, getNotificaciones);
router.put("/notificacion/:id", verifyToken, updateNotificacion);

export default router;
