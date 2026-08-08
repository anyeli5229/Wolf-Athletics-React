import { Request, Response } from "express";
import { crearEjercicio as crearEjercicioService, actualizarEjercicio as actualizarEjercicioService, eliminarEjercicio as eliminarEjercicioService, obtenerTodosLosEjercicios } from "../services/ejercicios.services";
import { EjercicioInput } from "../schemas/ejercicio.schema";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";

export async function obtenerEjercicios(req: Request, res: Response) {

    const routineId = req.query.routineId as string | undefined;

    if (!req.usuario?.id) {
        throw new UnauthorizedError("Token inválido");
    }

    const ejercicios = await obtenerTodosLosEjercicios(req.usuario.id, routineId);
    res.json(ejercicios);
}

export async function crearEjercicio(req: Request<{}, {}, EjercicioInput>, res: Response) {
    if (!req.usuario?.id) {
        throw new UnauthorizedError("Token inválido");
    }

    const ejercicioNuevo = await crearEjercicioService(req.usuario.id, req.body)
    res.status(201).json(ejercicioNuevo);
}

export async function actualizarEjercicio(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    if (!req.usuario?.id) {
        throw new UnauthorizedError("Token inválido");
    }

    const ejercicioActualizado = await actualizarEjercicioService(req.usuario.id, id, req.body);
    if (!ejercicioActualizado) {
        throw new NotFoundError("Ejercicio no encontrado");
    }
    res.json(ejercicioActualizado);
}

export async function eliminarEjercicio(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    if (!req.usuario?.id) {
        throw new UnauthorizedError("Token inválido");
    }

    const ejercicioEliminado = await eliminarEjercicioService(req.usuario.id, id);
    if (!ejercicioEliminado) {
        throw new NotFoundError("Ejercicio no encontrado");
    }
    res.json(ejercicioEliminado);
}