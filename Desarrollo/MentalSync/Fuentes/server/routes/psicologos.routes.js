import { Router } from "express";
import {
  createPsicologo,
  deletePsicologo,
  getPsicologo,
  getPsicologos,
  updatePsicologo,
} from "../controllers/psicologos.controller.js";
import {
  verifyToken,
  isAdmin,
  isPaciente,
  isPsicologo,
} from "../libs/auth.middleware.js";

const router = Router();

router.post("/psicologos", verifyToken, isAdmin, createPsicologo); //Crear psicologo por el admin
router.get("/psicologos", verifyToken, isAdmin, isPaciente, getPsicologos); //Ver todos los psicologos
router.get("/psicologo/:id", verifyToken, isAdmin, getPsicologo); //Ver psicologo especifico
router.get("/psicologo/perfil", verifyToken, isPsicologo, getPsicologo); //Ver el psicologo, mientras esta logeado
router.delete("/psicologos/:id", verifyToken, isAdmin, deletePsicologo); //Elimnar psicologo por el admin
router.put("/psicologos", verifyToken, isPsicologo, updatePsicologo); //Actualizar datos mientras esta logeado

export default router;
