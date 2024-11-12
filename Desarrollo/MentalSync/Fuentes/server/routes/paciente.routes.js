import { Router } from "express";
import { createPaciente, getPacientes, getPaciente, updatePaciente } from "../controllers/paciente.controller.js";
import { verifyToken, isAdmin, isPaciente } from "../libs/auth.middleware.js";

const router = Router();

router.post("/pacientes", createPaciente); //Crear paciente nuevo
router.get("/pacientes", verifyToken, isAdmin, getPacientes); //Ver todos los pacientes
router.get("/pacientes/perfil", verifyToken, isPaciente, getPaciente); //Ver el paciente, mientras esta logeado
router.put("/pacientes", verifyToken, isPaciente, updatePaciente); //Actualizar datos mientras esta logeado

export default router;
