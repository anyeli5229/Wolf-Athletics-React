import { Router } from "express";
import { actualizarRutina, crearRutina, eliminarRutina, obtenerRutinas } from "../controllers/rutinas.controller";


const router = Router();

router.get("/", obtenerRutinas);
router.post("/", crearRutina);
router.put("/:id", actualizarRutina);
router.delete("/:id", eliminarRutina);

export default router;