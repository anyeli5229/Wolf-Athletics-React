import { Request, Response } from "express";
import { obtenerTodasLasRutinas, crearRutina as crearRutinaService, actualizarRutina as actualizarRutinaService, eliminarRutina as eliminarRutinaService } from "../services/rutinas.services";
import { RutinaInput } from "../schemas/rutina.schema";
import { NotFoundError } from "../errors/NotFoundError";

export async function obtenerRutinas(req: Request, res: Response) {
    const rutinas = await obtenerTodasLasRutinas();
    res.json(rutinas);
}

export async function crearRutina(req: Request<{}, {}, RutinaInput>, res: Response) {
    const nuevaRutina = await crearRutinaService(req.body);
    res.status(201).json(nuevaRutina);
}

export async function actualizarRutina(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const rutinaActualizada = await actualizarRutinaService(id, req.body);
    if (!rutinaActualizada) {
        throw new NotFoundError("Rutina no encontrada");
    }
    res.json(rutinaActualizada);
}

export async function eliminarRutina(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const rutinaEliminada = await eliminarRutinaService(id);

    if (!rutinaEliminada) {
        throw new NotFoundError("Rutina no encontrada");
    }
    res.json(rutinaEliminada);
}