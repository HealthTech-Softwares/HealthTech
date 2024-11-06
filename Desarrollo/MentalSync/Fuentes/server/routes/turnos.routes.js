import { Router } from "express";
import {
  createTurnoPsicologo,
  getTurnoPsicologo,
  getTurnos,
} from "../controllers/turnos.controller.js";

const router = Router();

router.post("/turnos/:id", createTurnoPsicologo);
router.get("/turnos", getTurnos);
router.get("/turnos/:id", getTurnoPsicologo);

export default router;
