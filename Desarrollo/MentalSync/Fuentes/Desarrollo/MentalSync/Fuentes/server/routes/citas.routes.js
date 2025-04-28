import { Router } from "express";
import {
  createCita,
  getCitasPaciente,
  getCitasPsicologo,
  getCita,
  getDiagnostico,
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
router.get("/citas_paciente", verifyToken, isPaciente, getCitasPaciente);
router.get("/citas_psicologo", verifyToken, isPsicologo, getCitasPsicologo);
router.get("/citas/pacientes", verifyToken, isPsicologo, getPacientesPsicologo);
router.get("/last-cita/:idpaciente", verifyToken, isPsicologo, getPacientePsicologo);
router.get("/citas/pacientes/:idpaciente", verifyToken, isPsicologo, getCitasPacientePsicologo);
router.get("/cita/:id", verifyToken, hasRole("Administrador", "Paciente", "Psicologo"), getCita);
router.get("/diagnostico", verifyToken, hasRole("Administrador", "Psicologo"), getDiagnostico);
router.put("/cita/:idcita", verifyToken, hasRole("Administrador", "Paciente", "Psicologo"), updateCita);

export default router;
