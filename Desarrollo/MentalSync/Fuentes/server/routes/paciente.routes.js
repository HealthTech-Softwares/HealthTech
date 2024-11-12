import { Router } from "express";
import {
  createPaciente,
  getPacientes,
  getPaciente,
  updatePaciente,
} from "../controllers/paciente.controller.js";

const router = Router();

router.post("/pacientes", createPaciente);
router.get("/pacientes", getPacientes);
router.get("/pacientes/:id", getPaciente);
router.put("/pacientes/:id", updatePaciente);

export default router;
