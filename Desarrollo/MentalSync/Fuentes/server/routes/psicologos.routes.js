import { Router } from "express";
import {
  createPsicologo,
  deletePsicologo,
  getPsicologo,
  getPsicologos,
} from "../controllers/psicologos.controller.js";

const router = Router();

router.post("/psicologos", createPsicologo);
router.get("/psicologos", getPsicologos);
router.get("/psicologos/:id", getPsicologo);
router.delete("/psicologos/:id", deletePsicologo);

export default router;
