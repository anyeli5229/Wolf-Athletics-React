import prisma from "../config/prisma";
import { ActualizarEjercicioInput, EjercicioInput } from "../schemas/ejercicio.schema";


async function buscarEjercicio(userId: string, id: string) {
    return prisma.exercise.findFirst({
        where: { id, createdBy: userId }
    });
}

export async function obtenerTodosLosEjercicios(userId:string, routineId?: string) {

    return prisma.exercise.findMany({
        where: {
            OR: [
                { createdBy: null },
                { createdBy: userId }
            ],

            ...(routineId && {// (condicion && { objeto })
                routineExercises: {
                    none: {
                        routineId //solo los ejercicios donde NINGUNA (none) de sus relaciones en la tabla routineExercises coincida con routineId(ejercicios que NO estén en esa rutina)
                    }
                }
            })
        }
    });
}

export async function crearEjercicio(userId: string, datos: EjercicioInput) {
    return prisma.exercise.create({
        data: {
            ...datos,
            createdBy: userId
        }
    });
}

export async function actualizarEjercicio(userId: string, id: string, datosActualizados: ActualizarEjercicioInput) {
    const ejercicio = await buscarEjercicio(userId, id);
    if (!ejercicio) return null;
    return prisma.exercise.update({
        where: { id },
        data: datosActualizados
    });
}

export async function eliminarEjercicio(userId: string, id: string) {
    const ejercicio = await buscarEjercicio(userId, id);
    if (!ejercicio) return null;
    return prisma.exercise.delete({
        where: { id }
    });
}