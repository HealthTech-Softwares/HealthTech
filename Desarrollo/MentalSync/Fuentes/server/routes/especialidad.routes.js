import { Router } from "express";
import {
  createEspPsicologo,
  getEspecialidades,
  getEspsPsicologo,
  getEspFaltantesPsicologo,
} from "../controllers/especialidad.controller.js";
import { verifyToken, isAdmin, hasRole } from "../libs/auth.middleware.js";

const router = Router();

router.post("/especialidades/:id", verifyToken, isAdmin, createEspPsicologo); //Asignar especialidad a psicologo
router.get("/especialidades", verifyToken, hasRole("Administrador", "Paciente"), getEspecialidades); //Ver las especialidades que tiene el psicologo (para el admin)
router.get("/especialidades/:id", verifyToken, isAdmin, getEspsPsicologo); //Ver las especialidades que tiene un psicologo
router.get("/especialidades/faltantes/:id", verifyToken, isAdmin, getEspFaltantesPsicologo); //Ver las especialidades que no tiene un psicologo

export default router;
