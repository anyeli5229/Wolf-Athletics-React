import { Router } from "express";
import { validarId } from "../middlewares/rutina.middleware";
import { validateSchema } from "../middlewares/validateSchema.middleware";
import { actualizarRutinaEjercicioSchema, rutinaEjercicioSchema } from "../schemas/rutinaEjercicio.schema";
import { asyncHandler } from "../utils/asyncHandler";
import { actualizarRutinaEjercicio, crearRutinaEjercicio, eliminarRutinaEjercicio, obtenerRutinaEjercicios } from "../controllers/rutinaEjercicio.controller";

const router = Router();

router.get("/rutinas/:id/ejercicios", validarId, asyncHandler(obtenerRutinaEjercicios))
router.post("/rutinas/:id/ejercicios", validarId, validateSchema(rutinaEjercicioSchema), asyncHandler(crearRutinaEjercicio));
router.put("/rutinas/:id/ejercicios/:routineExerciseId", validarId, validateSchema(actualizarRutinaEjercicioSchema), asyncHandler(actualizarRutinaEjercicio));
router.delete("/rutinas/:id/ejercicios/:routineExerciseId", validarId, asyncHandler(eliminarRutinaEjercicio));

export default router;