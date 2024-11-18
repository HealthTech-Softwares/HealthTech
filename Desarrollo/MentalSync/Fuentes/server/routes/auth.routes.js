import { Router } from "express";
import { login, logout, verify } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/verify", verify);
export default router;
