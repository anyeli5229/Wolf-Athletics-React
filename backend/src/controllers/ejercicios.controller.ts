import { Request, Response } from "express";
import { crearEjercicio as crearEjercicioService, actualizarEjercicio as actualizarEjercicioService, eliminarEjercicio as eliminarEjercicioService, obtenerTodosLosEjercicios } from "../services/ejercicios.services";
import { EjercicioInput } from "../schemas/ejercicio.schema";
import { NotFoundError } from "../errors/NotFoundError";
import { obtenerUsuarioAutenticado } from "../utils/auth";

export async function obtenerEjercicios(req: Request, res: Response) {

    const routineId = req.query.routineId as string | undefined;

    const { id: userId } = obtenerUsuarioAutenticado(req);

    const ejercicios = await obtenerTodosLosEjercicios(userId, routineId);

    res.json(ejercicios);
}

export async function crearEjercicio(req: Request<{}, {}, EjercicioInput>, res: Response) {
    const { id: userId } = obtenerUsuarioAutenticado(req);

    const ejercicioNuevo = await crearEjercicioService(userId, req.body)

    res.status(201).json(ejercicioNuevo);
}

export async function actualizarEjercicio(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    const { id: userId } = obtenerUsuarioAutenticado(req);

    const ejercicioActualizado = await actualizarEjercicioService(userId, id, req.body);

    if (!ejercicioActualizado) {
        throw new NotFoundError("Ejercicio no encontrado");
    }

    res.json(ejercicioActualizado);
}

export async function eliminarEjercicio(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    const { id: userId } = obtenerUsuarioAutenticado(req);

    const ejercicioEliminado = await eliminarEjercicioService(userId, id);

    if (!ejercicioEliminado) {
        throw new NotFoundError("Ejercicio no encontrado");
    }

    res.json(ejercicioEliminado);
}