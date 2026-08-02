import prisma from "../config/prisma";
import { ActualizarEjercicioInput, EjercicioInput } from "../schemas/ejercicio.schema";
import { obtenerUsuarioDemo } from "./usuario.service";


async function buscarEjercicio(id: string) {
    return prisma.exercise.findUnique({
        where: { id }
    });
}

export async function obtenerTodosLosEjercicios() {
    return prisma.exercise.findMany();
}

export async function crearEjercicio(datos: EjercicioInput) {
    const usuarioDemo = await obtenerUsuarioDemo();
    if(!usuarioDemo) return null
    return prisma.exercise.create({
        data: {
            ...datos,
            createdBy: usuarioDemo.id
        }
    });
}

export async function actualizarEjercicio(id: string, datosActualizados: ActualizarEjercicioInput) {
    const ejercicio = await buscarEjercicio(id); 
    if(!ejercicio)  return null;
    return prisma.exercise.update({
        where: { id },
        data: datosActualizados
    });
}

export async function eliminarEjercicio(id: string) {
    const ejercicio = await buscarEjercicio(id); 
    if(!ejercicio)  return null;
    return prisma.exercise.delete({
        where: { id }
    });
}