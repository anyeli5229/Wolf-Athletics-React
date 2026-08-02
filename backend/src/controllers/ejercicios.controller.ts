import {Request, Response } from "express";
import { crearEjercicio as crearEjercicioService, actualizarEjercicio as actualizarEjercicioService, eliminarEjercicio as eliminarEjercicioService, obtenerTodosLosEjercicios } from "../services/ejercicios.services";
import { EjercicioInput } from "../schemas/ejercicio.schema";
import { NotFoundError } from "../errors/NotFoundError";

export async function obtenerEjercicios(req: Request, res: Response) {
    const ejercicios = await obtenerTodosLosEjercicios()
    res.json(ejercicios);
}

export async function crearEjercicio(req: Request<{}, {}, EjercicioInput>, res: Response) {
    const ejercicioNuevo = await crearEjercicioService(req.body)
    res.status(201).json(ejercicioNuevo);
}

export async function actualizarEjercicio(req: Request<{id:string}>, res: Response) {
    const { id } = req.params;
    const ejercicioActualizado = await actualizarEjercicioService(id, req.body);
    if(!ejercicioActualizado) {
        throw new NotFoundError("Ejercicio no encontrado");
    }
    res.json(ejercicioActualizado);
}

export async function eliminarEjercicio(req: Request<{id:string}>, res: Response) {
    const { id } = req.params;
    const ejercicioEliminado = await eliminarEjercicioService(id);
    if(!ejercicioEliminado) {
        throw new NotFoundError("Ejercicio no encontrado");
    }
    res.json(ejercicioEliminado);
}