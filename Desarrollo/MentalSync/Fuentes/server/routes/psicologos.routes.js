import { Router } from "express";
import {
  createPsicologo,
  deletePsicologo,
  getPsicologo,
  getPsicologos,
  perfilPsicologo,
  updatePsicologo,
} from "../controllers/psicologos.controller.js";
import {
  verifyToken,
  isAdmin,
  isPsicologo,
  hasRole,
} from "../libs/auth.middleware.js";

const router = Router();

router.post("/psicologos", verifyToken, isAdmin, createPsicologo); //Crear psicologo por el admin
router.get("/psicologos", verifyToken, hasRole("Administrador", "Paciente"), getPsicologos); //Ver todos los psicologos (para el admin)
router.get("/psicologos/:id", verifyToken, hasRole("Administrador", "Paciente"), getPsicologo); //Ver psicologo especifico
router.get("/psicologo/perfil", verifyToken, isPsicologo, perfilPsicologo); //Ver el psicologo, mientras esta logeado
router.delete("/psicologos/:id", verifyToken, isAdmin, deletePsicologo); //Elimnar psicologo por el admin
router.put("/psicologos", verifyToken, isPsicologo, updatePsicologo); //Actualizar datos mientras esta logeado

export default router;
