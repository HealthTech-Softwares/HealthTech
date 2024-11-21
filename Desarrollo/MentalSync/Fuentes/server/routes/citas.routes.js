import { Router } from "express";
import {
  createCita,
  getCitasPaciente,
  getCitasPsicologo,
  getCita,
  updateCita,
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
router.get("/cita/:id", verifyToken, hasRole("Administrador", "Paciente", "Psicologo"), getCita);
router.put("/cita/:id", verifyToken, hasRole("Administrador", "Paciente", "Psicologo"), updateCita);

export default router;
