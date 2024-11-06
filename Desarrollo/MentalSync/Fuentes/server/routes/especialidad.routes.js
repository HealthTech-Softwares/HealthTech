import { Router } from "express";
import {
  createEspecialidadPsicologo,
  getEspecialidades,
  getEspecialidadesPsicologo,
  getEspecialidadesFaltantesPsicologo,
} from "../controllers/especialidad.controller.js";

const router = Router();

router.post("/especialidades/:id", createEspecialidadPsicologo);
router.get("/especialidades", getEspecialidades);
router.get("/especialidades/:id", getEspecialidadesPsicologo);
router.get(
  "/especialidades/faltantes/:id",
  getEspecialidadesFaltantesPsicologo
);

export default router;
