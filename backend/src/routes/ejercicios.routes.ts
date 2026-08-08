import { Router } from "express";
import { actualizarEjercicio, crearEjercicio, eliminarEjercicio, obtenerEjercicios } from "../controllers/ejercicios.controller";
import { validateSchema } from "../middlewares/validateSchema.middleware";
import { actualizarEjercicioSchema, ejercicioSchema } from "../schemas/ejercicio.schema";
import { asyncHandler } from "../utils/asyncHandler";
import { validarId } from "../middlewares/rutina.middleware";
import { autenticarUsuario } from "../middlewares/auth.middleware";


const router = Router();

router.use(autenticarUsuario);

router.get("/", obtenerEjercicios);
router.post("/", validateSchema(ejercicioSchema), asyncHandler(crearEjercicio));
router.put("/:id", validarId, validateSchema(actualizarEjercicioSchema), asyncHandler(actualizarEjercicio));
router.delete("/:id", validarId, asyncHandler(eliminarEjercicio));

export default router;