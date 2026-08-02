import prisma from "../config/prisma";
import { ActualizarRutinaInput, RutinaInput } from "../schemas/rutina.schema";
import { obtenerUsuarioDemo } from "./usuario.service";


async function buscarRutina(id: string) {
    return prisma.routine.findUnique({
        where: { id }
    });
}

export async function obtenerTodasLasRutinas() {
    return prisma.routine.findMany({
        include: {
            ejercicios: true
        }
    });
}

export async function crearRutina(datos: RutinaInput) {

    const usuarioDemo = await obtenerUsuarioDemo();

    if (!usuarioDemo) return null;

    return prisma.routine.create({
        data: {
            ...datos,
            userId: usuarioDemo.id
        },
        include: {
            ejercicios: true
        }
    });
}

export async function actualizarRutina(id: string, datosActualizados: ActualizarRutinaInput) {
    const rutina = await buscarRutina(id);
    if (!rutina) return null;

    return prisma.routine.update({
        where: { id },
        data: datosActualizados, 
        include: {
            ejercicios: true
        }
    })

}

export async function eliminarRutina(id: string) {
    const rutina = await buscarRutina(id);
    if (!rutina) return null;

    return prisma.routine.delete({
        where: { id }
    });
}