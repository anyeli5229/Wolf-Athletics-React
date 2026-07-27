import { Router } from "express";
import { actualizarRutina, crearRutina, eliminarRutina, obtenerRutinas } from "../controllers/rutinas.controller";
import { validarId } from "../middlewares/rutina.middleware";
import { validateSchema } from "../middlewares/validateSchema.middleware";
import { rutinaSchema } from "../schemas/rutina.schema";
import { asyncHandler } from "../utils/asyncHandler";


const router = Router();

router.get("/", obtenerRutinas);
router.post("/", validateSchema(rutinaSchema), asyncHandler(crearRutina));
router.put("/:id",validarId,validateSchema(rutinaSchema), asyncHandler(actualizarRutina));
router.delete("/:id", validarId, asyncHandler(eliminarRutina));

export default router;