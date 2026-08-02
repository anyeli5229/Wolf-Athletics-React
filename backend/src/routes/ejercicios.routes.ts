import { Router } from "express";
import { actualizarEjercicio, crearEjercicio, eliminarEjercicio, obtenerEjercicios } from "../controllers/ejercicios.controller";
import { validateSchema } from "../middlewares/validateSchema.middleware";
import { ejercicioSchema } from "../schemas/ejercicio.schema";
import { asyncHandler } from "../utils/asyncHandler";
import { validarId } from "../middlewares/rutina.middleware";


const router = Router();

router.get("/", obtenerEjercicios);
router.post("/", validateSchema(ejercicioSchema), asyncHandler(crearEjercicio));
router.put("/:id", validarId, validateSchema(ejercicioSchema), asyncHandler(actualizarEjercicio));
router.delete("/:id", validarId, asyncHandler(eliminarEjercicio));

export default router;