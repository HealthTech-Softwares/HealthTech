import { Router } from "express";
import {
  createTurnoPsicologo,
  getTurnoPsicologo,
  getTurnos,
  getTurnosFaltantesPsicologo,
  updateTurnoPsicologo,
} from "../controllers/turnos.controller.js";
import { verifyToken, isAdmin, isPsicologo } from "../libs/auth.middleware.js";

const router = Router();

router.post("/turnos/:id", verifyToken, isAdmin, createTurnoPsicologo); //Asignar turno a psicologo
router.get("/turnos", verifyToken, isAdmin, getTurnos); //Ver todos los turnos
router.get("/turnos/:id", verifyToken, isAdmin, getTurnoPsicologo); //Ver los turnos de un psicologo
router.get("/turnos/faltantes", verifyToken, isPsicologo, getTurnosFaltantesPsicologo); //Ver los turnos que no tiene un psicologo
router.put("/turnos", verifyToken, isPsicologo, updateTurnoPsicologo); //Agregar horarios del psicologo

export default router;
