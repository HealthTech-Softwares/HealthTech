import { Router } from "express";

import {
  createNotificacion,
  getTodasNotificaciones,
  getNotificaciones,
} from "../controllers/notificacion.controller";
import { verifyToken, isAdmin } from "../libs/auth.middleware";

const router = Router();

router.post("/notificacion", createNotificacion);
router.get("/notificaciones", verifyToken, isAdmin, getTodasNotificaciones);
router.get("/notificaciones/:id", verifyToken, getNotificaciones);

export default router;
