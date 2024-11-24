import { Router } from "express";
import {
  createCita,
  getCitasPaciente,
  getCitasPsicologo,
  getCita,
  getPacientesPsicologo,
  getCitasPacientePsicologo,
  updateCita,
  getPacientePsicologo,
} from "../controllers/citas.controller.js";
import {
  verifyToken,
  isPaciente,
  isPsicologo,
  hasRole,
} from "../libs/auth.middleware.js";

const router = Router();

router.post("/cita", verifyToken, isPaciente, createCita);
router.get("/citas", verifyToken, isPaciente, getCitasPaciente);
router.get("/citas", verifyToken, isPsicologo, getCitasPsicologo);
router.get("/citas/pacientes", verifyToken, isPsicologo, getPacientesPsicologo);
router.get("/last-cita/:idpaciente", verifyToken, isPsicologo, getPacientePsicologo);
router.get("/citas/pacientes/:idpaciente", verifyToken, isPsicologo, getCitasPacientePsicologo);
router.get("/cita/:id", verifyToken, hasRole("Administrador", "Paciente", "Psicologo"), getCita);
router.put("/cita/:id", verifyToken, hasRole("Administrador", "Paciente", "Psicologo"), updateCita);

export default router;
