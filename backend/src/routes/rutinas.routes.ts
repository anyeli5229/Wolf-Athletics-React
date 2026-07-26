import { Router } from "express";
import { actualizarRutina, crearRutina, eliminarRutina, obtenerRutinas } from "../controllers/rutinas.controller";
import { validarId, validarRutina } from "../middlewares/rutina.middleware";
import { validateSchema } from "../middlewares/validateSchema.middleware";
import { rutinaSchema } from "../schemas/rutina.schema";


const router = Router();

router.get("/", obtenerRutinas);
router.post("/", validateSchema(rutinaSchema), crearRutina);
router.put("/:id", validarId,validarRutina,actualizarRutina);
router.delete("/:id", validarId, eliminarRutina);

export default router;