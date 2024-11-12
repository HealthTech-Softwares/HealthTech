import { Router } from "express";
import { createTurnoPsicologo, getTurnoPsicologo, getTurnos, getTurnosFaltantesPsicologo } from "../controllers/turnos.controller.js";
import { verifyToken, isAdmin } from "../libs/auth.middleware.js";

const router = Router();

router.post("/turnos/:id", verifyToken, isAdmin, createTurnoPsicologo);
router.get("/turnos", verifyToken, isAdmin, getTurnos);
router.get("/turnos/:id", verifyToken, isAdmin, getTurnoPsicologo);
router.get("/turnos/faltantes/:id", verifyToken, isAdmin, getTurnosFaltantesPsicologo);

export default router;
