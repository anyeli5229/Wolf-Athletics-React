import { Request, Response } from "express";
import { obtenerTodasLasRutinas, crearRutina as crearRutinaService, actualizarRutina as actualizarRutinaService, eliminarRutina as eliminarRutinaService } from "../services/rutinas.services";
import { RutinaInput } from "../schemas/rutina.schema";
import { NotFoundError } from "../errors/NotFoundError";

export function obtenerRutinas(req: Request, res: Response) {

    const rutinas = obtenerTodasLasRutinas();

    res.json(rutinas);
}

export function crearRutina(req: Request<{}, {}, RutinaInput>, res: Response) {
    const nuevaRutina = crearRutinaService(req.body);
    res.status(201).json(nuevaRutina);
}

export function actualizarRutina(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const rutinaActualizada = actualizarRutinaService(id, req.body);
    if (!rutinaActualizada) {
        throw new NotFoundError("Rutina no encontrada");
    }

    res.json(rutinaActualizada);
}

export function eliminarRutina(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const rutinaEliminada = eliminarRutinaService(id);

    if (!rutinaEliminada) {
        throw new NotFoundError("Rutina no encontrada");
    }

    res.json(rutinaEliminada);
}