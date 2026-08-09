import { Request, Response } from "express";
import { obtenerTodasLasRutinas, crearRutina as crearRutinaService, actualizarRutina as actualizarRutinaService, eliminarRutina as eliminarRutinaService } from "../services/rutinas.services";
import { RutinaInput } from "../schemas/rutina.schema";
import { NotFoundError } from "../errors/NotFoundError";
import { obtenerUsuarioAutenticado } from "../utils/auth";


export async function obtenerRutinas(req: Request, res: Response) {
    const { id: userId } = obtenerUsuarioAutenticado(req);
    const rutinas = await obtenerTodasLasRutinas(userId);
    res.json(rutinas);
}

export async function crearRutina(req: Request<{}, {}, RutinaInput>, res: Response) {
    const { id: userId } = obtenerUsuarioAutenticado(req);
    const nuevaRutina = await crearRutinaService(req.body, userId);
    res.status(201).json(nuevaRutina);
}

export async function actualizarRutina(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    const { id: userId } = obtenerUsuarioAutenticado(req);

    const rutinaActualizada = await actualizarRutinaService(id, userId, req.body);
    if (!rutinaActualizada) {
        throw new NotFoundError("Rutina no encontrada");
    }
    res.json(rutinaActualizada);
}

export async function eliminarRutina(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    const { id: userId } = obtenerUsuarioAutenticado(req);

    const rutinaEliminada = await eliminarRutinaService(id, userId);

    if (!rutinaEliminada) {
        throw new NotFoundError("Rutina no encontrada");
    }

    res.json(rutinaEliminada);
}