import { Request, Response } from "express";
import { actualizarRutinaEjercicioInput, rutinaEjercicioInput } from "../schemas/rutinaEjercicio.schema";
import { crearRutinaEjercicio as crearRutinaEjercicioService, obtenerRutinaEjercicios as obtenerRutinaEjerciciosService, actualizarEjercicioRutina as actualizarEjercicioRutinaService, eliminarEjercicioRutina as eliminarEjercicioRutinaService } from "../services/rutinaEjercicio.services";
import { obtenerUsuarioAutenticado } from "../utils/auth";


export async function obtenerRutinaEjercicios(req: Request<{ id: string }>, res: Response) {
    const { id: routineId } = req.params;

    const { id: userId } = obtenerUsuarioAutenticado(req);

    const ejerciciosDeLaRutina = await obtenerRutinaEjerciciosService(routineId, userId);
    res.json(ejerciciosDeLaRutina);
}

export async function crearRutinaEjercicio(req: Request<{ id: string }, {}, rutinaEjercicioInput>, res: Response) {
    const { id: routineId } = req.params;

    const { id: userId } = obtenerUsuarioAutenticado(req);

    const datos = req.body;

    const nuevoEjercicioRutina = await crearRutinaEjercicioService(
        { routineId, ...datos }, userId
    )

    res.status(201).json(nuevoEjercicioRutina);
}

export async function actualizarRutinaEjercicio(req: Request<{ id: string, routineExerciseId: string }, {}, actualizarRutinaEjercicioInput>, res: Response) {
    const { id: routineId, routineExerciseId } = req.params;
    
    const datos = req.body;

    const { id: userId } = obtenerUsuarioAutenticado(req);

    const ejercicioRutinaActualizado = await actualizarEjercicioRutinaService(routineId, routineExerciseId, datos, userId);

    res.json(ejercicioRutinaActualizado);
}

export async function eliminarRutinaEjercicio(req: Request<{ id: string, routineExerciseId: string }>, res: Response) {
    const { id: routineId, routineExerciseId } = req.params;

    const { id: userId } = obtenerUsuarioAutenticado(req);

    const ejercicioRutinaEliminado = await eliminarEjercicioRutinaService(routineId, routineExerciseId, userId);

    res.json(ejercicioRutinaEliminado);
}