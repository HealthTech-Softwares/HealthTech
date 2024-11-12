import { Router } from "express";
import { createPsicologo, deletePsicologo, getPsicologo, getPsicologos, updatePsicologo } from "../controllers/psicologos.controller.js";
import { verifyToken, isAdmin, isPsicologo } from "../libs/auth.middleware.js";

const router = Router();

router.post("/psicologos", verifyToken, isAdmin, createPsicologo);
router.get("/psicologos", verifyToken, isAdmin, getPsicologos);
router.get("/psicologo/:id", verifyToken, isAdmin, getPsicologo);
router.get("/psicologo/perfil", verifyToken, isPsicologo, getPsicologo);
router.delete("/psicologos/:id", verifyToken, isAdmin, deletePsicologo);
router.put("/psicologos", verifyToken, isPsicologo, updatePsicologo);

export default router;
