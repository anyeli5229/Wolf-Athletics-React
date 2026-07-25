import { Router } from "express";
import { actualizarRutina, crearRutina, eliminarRutina, obtenerRutinas } from "../controllers/rutinas.controller";
import { validarId, validarRutina } from "../middlewares/rutina.middleware";


const router = Router();

router.get("/", obtenerRutinas);
router.post("/", validarRutina,crearRutina);
router.put("/:id", validarId,validarRutina,actualizarRutina);
router.delete("/:id", validarId, eliminarRutina);

export default router;