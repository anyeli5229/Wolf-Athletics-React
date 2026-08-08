import prisma from "../config/prisma";
import { ActualizarRutinaInput, RutinaInput } from "../schemas/rutina.schema";

export async function buscarRutina(id: string, userId: string) {
    return prisma.routine.findFirst({
        where: {
            id,
            userId
        }
    });
}

export async function obtenerTodasLasRutinas(userId: string) {
    return prisma.routine.findMany({
        where: {
            userId
        },
        include: {
            ejercicios: true
        }
    });
}

export async function crearRutina(datos: RutinaInput, userId:string) {

    return prisma.routine.create({
        data: {
            ...datos,
            userId
        },
        include: {
            ejercicios: true
        }
    });
}

export async function actualizarRutina(id: string, userId:string, datosActualizados: ActualizarRutinaInput) {
    const rutina = await buscarRutina(id, userId);
    if (!rutina) return null;

    return prisma.routine.update({
        where: { id },
        data: datosActualizados, 
        include: {
            ejercicios: true
        }
    })

}

export async function eliminarRutina(id: string, userId: string) {
    const rutina = await buscarRutina(id, userId);
    if (!rutina) return null;

    return prisma.routine.delete({
        where: { id }
    });
}