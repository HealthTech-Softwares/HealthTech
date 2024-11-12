import { Router } from "express";
import { createTurnoPsicologo, getTurnoPsicologo, getTurnos, getTurnosFaltantesPsicologo } from "../controllers/turnos.controller.js";
import { verifyToken, isAdmin } from "../libs/auth.middleware.js";

const router = Router();

router.post("/turnos/:id", verifyToken, isAdmin, createTurnoPsicologo); //Asignar turno a psicologo
router.get("/turnos", verifyToken, isAdmin, getTurnos); //Ver todos los turnos
router.get("/turnos/:id", verifyToken, isAdmin, getTurnoPsicologo); //Ver los turnos de un psicologo
router.get("/turnos/faltantes/:id", verifyToken, isAdmin, getTurnosFaltantesPsicologo); //Ver los turnos que no tiene un psicologo

export default router;
