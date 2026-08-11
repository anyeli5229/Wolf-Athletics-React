import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware";
import { LoginSchema, registerSchema } from "../schemas/auth/auth.schema";
import { auth, iniciarSesion, registro } from "../controllers/auth.controller";
import { asyncHandler } from "../utils/asyncHandler";
import { autenticarUsuario } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", validateSchema(registerSchema), asyncHandler(registro));
router.post("/login", validateSchema(LoginSchema), asyncHandler(iniciarSesion));
router.get("/me", autenticarUsuario, auth);

export default router;