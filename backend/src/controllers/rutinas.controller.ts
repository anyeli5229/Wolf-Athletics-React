import { Request, Response } from "express";
import { obtenerTodasLasRutinas, crearRutina as crearRutinaService, actualizarRutina as actualizarRutinaService, eliminarRutina as eliminarRutinaService } from "../services/rutinas.services";
import { RutinaInput } from "../schemas/rutina.schema";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";


export async function obtenerRutinas(req: Request, res: Response) {
    if (!req.usuario?.id) {
        throw new UnauthorizedError("Token inválido");
    }
    const rutinas = await obtenerTodasLasRutinas(req.usuario.id);
    res.json(rutinas);
}

export async function crearRutina(req: Request<{}, {}, RutinaInput>, res: Response) {
    if (!req.usuario?.id) {
        throw new UnauthorizedError("Token inválido");
    }
    const nuevaRutina = await crearRutinaService(req.body, req.usuario.id);
    res.status(201).json(nuevaRutina);
}

export async function actualizarRutina(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    if (!req.usuario?.id) {
        throw new UnauthorizedError("Token inválido");
    }

    const rutinaActualizada = await actualizarRutinaService(id, req.usuario.id, req.body);
    if (!rutinaActualizada) {
        throw new NotFoundError("Rutina no encontrada");
    }
    res.json(rutinaActualizada);
}

export async function eliminarRutina(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    if (!req.usuario?.id) {
        throw new UnauthorizedError("Token inválido");
    }
    
    const rutinaEliminada = await eliminarRutinaService(id, req.usuario.id,);

    if (!rutinaEliminada) {
        throw new NotFoundError("Rutina no encontrada");
    }
    res.json(rutinaEliminada);
}