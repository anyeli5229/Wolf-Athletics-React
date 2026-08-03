import { Request, Response } from "express";
import { actualizarRutinaEjercicioInput, rutinaEjercicioInput } from "../schemas/rutinaEjercicio.schema";
import { crearRutinaEjercicio as  crearRutinaEjercicioService, obtenerRutinaEjercicios as obtenerRutinaEjerciciosService, actualizarEjercicioRutina as actualizarEjercicioRutinaService, eliminarEjercicioRutina as eliminarEjercicioRutinaService} from "../services/rutinaEjercicio.services";


export async function obtenerRutinaEjercicios(req:Request<{id:string}>, res: Response) {
    const { id: routineId } = req.params;
    const ejerciciosDeLaRutina = await obtenerRutinaEjerciciosService(routineId);
    res.json(ejerciciosDeLaRutina);
}

export async function crearRutinaEjercicio(req: Request<{id: string}, {}, rutinaEjercicioInput>, res: Response) {
    const { id: routineId} = req.params;
    const datos = req.body;

    const nuevoEjercicioRutina = await crearRutinaEjercicioService({
        routineId,
        ...datos
    })

    res.status(201).json(nuevoEjercicioRutina);
}

export async function actualizarRutinaEjercicio(req: Request<{id: string, routineExerciseId: string}, {}, actualizarRutinaEjercicioInput>, res: Response) {
    const { id: routineId, routineExerciseId} = req.params;
    const datos = req.body;
    const ejercicioRutinaActualizado = await actualizarEjercicioRutinaService(routineId, routineExerciseId, datos);
    res.json(ejercicioRutinaActualizado);
}

export async function eliminarRutinaEjercicio(req: Request<{id: string, routineExerciseId: string}>, res: Response) {
    const { id: routineId, routineExerciseId} = req.params;
    const ejercicioRutinaEliminado = await eliminarEjercicioRutinaService(routineId, routineExerciseId);
    res.json(ejercicioRutinaEliminado);
}