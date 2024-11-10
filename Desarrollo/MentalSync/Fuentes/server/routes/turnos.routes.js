import { Router } from "express";
import {
  createTurnoPsicologo,
  getTurnoPsicologo,
  getTurnos,
  getTurnosFaltantesPricologo,
} from "../controllers/turnos.controller.js";

const router = Router();

router.post("/turnos/:id", createTurnoPsicologo);
router.get("/turnos", getTurnos);
router.get("/turnos/:id", getTurnoPsicologo);
router.get("/turnos/faltantes/:id", getTurnosFaltantesPricologo);

export default router;
