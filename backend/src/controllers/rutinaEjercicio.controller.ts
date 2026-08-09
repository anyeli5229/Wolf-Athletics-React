import { Request, Response } from "express";
import { actualizarRutinaEjercicioInput, rutinaEjercicioInput } from "../schemas/rutinaEjercicio.schema";
import { crearRutinaEjercicio as crearRutinaEjercicioService, obtenerRutinaEjercicios as obtenerRutinaEjerciciosService, actualizarEjercicioRutina as actualizarEjercicioRutinaService, eliminarEjercicioRutina as eliminarEjercicioRutinaService } from "../services/rutinaEjercicio.services";
import { UnauthorizedError } from "../errors/UnauthorizedError";


export async function obtenerRutinaEjercicios(req: Request<{ id: string }>, res: Response) {
    const { id: routineId } = req.params;

    if (!req.usuario?.id) {
        throw new UnauthorizedError("Token inválido");
    }

    const ejerciciosDeLaRutina = await obtenerRutinaEjerciciosService(routineId, req.usuario.id);
    res.json(ejerciciosDeLaRutina);
}

export async function crearRutinaEjercicio(req: Request<{ id: string }, {}, rutinaEjercicioInput>, res: Response) {
    const { id: routineId } = req.params;

    if (!req.usuario?.id) {
        throw new UnauthorizedError("Token inválido");
    }

    const datos = req.body;

    const nuevoEjercicioRutina = await crearRutinaEjercicioService(
        { routineId, ...datos }, req.usuario.id
    )

    res.status(201).json(nuevoEjercicioRutina);
}

export async function actualizarRutinaEjercicio(req: Request<{ id: string, routineExerciseId: string }, {}, actualizarRutinaEjercicioInput>, res: Response) {
    const { id: routineId, routineExerciseId } = req.params;
    const datos = req.body;

    if (!req.usuario?.id) {
        throw new UnauthorizedError("Token inválido");
    }

    const ejercicioRutinaActualizado = await actualizarEjercicioRutinaService(routineId, routineExerciseId, datos, req.usuario.id);
    res.json(ejercicioRutinaActualizado);
}

export async function eliminarRutinaEjercicio(req: Request<{ id: string, routineExerciseId: string }>, res: Response) {
    const { id: routineId, routineExerciseId } = req.params;

    if (!req.usuario?.id) {
        throw new UnauthorizedError("Token inválido");
    }

    const ejercicioRutinaEliminado = await eliminarEjercicioRutinaService(routineId, routineExerciseId, req.usuario.id);
    
    res.json(ejercicioRutinaEliminado);
}