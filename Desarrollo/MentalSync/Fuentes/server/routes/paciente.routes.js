import { Router } from "express";
import { createPaciente, getPacientes, getPaciente, updatePaciente } from "../controllers/paciente.controller.js";
import { verifyToken, isAdmin, isPaciente } from "../libs/auth.middleware.js";

const router = Router();

router.post("/pacientes", createPaciente);
router.get("/pacientes", verifyToken, isAdmin, getPacientes);
router.get("/perfil-pacientes", verifyToken, isPaciente, getPaciente);
router.put("/pacientes/:id", verifyToken, isPaciente, updatePaciente);

export default router;
