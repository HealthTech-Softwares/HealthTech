import { Router } from "express";
import {
  createEspPsicologo,
  getEspecialidades,
  getEspsPsicologo,
  getEspFaltantesPsicologo,
} from "../controllers/especialidad.controller.js";
import { verifyToken, isAdmin } from "../libs/auth.middleware.js";

const router = Router();

router.post("/especialidades/:id", verifyToken, isAdmin, createEspPsicologo);
router.get("/especialidades", verifyToken, isAdmin, getEspecialidades);
router.get("/especialidades/:id", verifyToken, isAdmin, getEspsPsicologo);
router.get(
  "/especialidades/faltantes/:id",
  verifyToken,
  isAdmin,
  getEspFaltantesPsicologo
);

export default router;
