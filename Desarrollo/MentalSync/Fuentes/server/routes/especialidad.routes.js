import { Router } from "express";
import {
  getEspecialidades,
  getEspecialidadesPsicologo,
} from "../controllers/especialidad.controller.js";

const router = Router();

router.get("/especialidades", getEspecialidades);
router.get("/especialidades/:id", getEspecialidadesPsicologo);

export default router;
