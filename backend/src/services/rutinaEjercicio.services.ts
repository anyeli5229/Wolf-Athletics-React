import prisma from "../config/prisma";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { actualizarRutinaEjercicioInput, rutinaEjercicioInput } from "../schemas/rutinaEjercicio.schema";


export async function obtenerRutinaEjercicios(routineId: string) {
    const rutinaExiste = await prisma.routine.findUnique({
        where: { id: routineId }
    })

    if (!rutinaExiste) {
        throw new NotFoundError("La rutina especificada no existe");
    }

    return prisma.routineExercise.findMany({
        where: { routineId },
        orderBy: {
            orden: "asc"
        },
        include: {
            exercise: true
        }
    })
}

export async function crearRutinaEjercicio(datos: { routineId: string } & rutinaEjercicioInput) {

    const [rutinaExiste, ejercicioExiste, yaExisteEnRutina] = await Promise.all([
        prisma.routine.findUnique({ where: { id: datos.routineId } }),
        prisma.exercise.findUnique({ where: { id: datos.exerciseId } }),
        prisma.routineExercise.findFirst({
            where: {
                routineId: datos.routineId,
                exerciseId: datos.exerciseId
            }
        })
    ]);

    if (!rutinaExiste) {
        throw new NotFoundError("La rutina especificada no existe");
    }

    if (!ejercicioExiste) {
        throw new NotFoundError("El ejercicio seleccionado no existe en el catálogo");
    }

    if (yaExisteEnRutina) {
        throw new BadRequestError("Este ejercicio ya está agregado a la rutina");
    }

    const conteo = await prisma.routineExercise.count({
        where: { routineId: datos.routineId }
    });

    return await prisma.routineExercise.create({
        data: {
            ...datos,
            orden: conteo + 1
        },
        include: {
            exercise: true
        }
    });
}

export async function actualizarEjercicioRutina(routineId: string, routineExerciseId: string, datos: actualizarRutinaEjercicioInput) {
    const ejercicioRutina = await prisma.routineExercise.findFirst({
        where: { id: routineExerciseId }
    });

    if (!ejercicioRutina) {
        throw new NotFoundError("El ejercicio no existe en la rutina");
    }

    if (ejercicioRutina.routineId !== routineId) {
        throw new BadRequestError("El ejercicio no pertenece a esta rutina");
    }

    return await prisma.routineExercise.update({
        where: { id: ejercicioRutina.id },
        data: datos,
        include: { exercise: true }
    });
}

export async function eliminarEjercicioRutina(routineId: string, routineExerciseId: string) {
    const ejercicioRutina = await prisma.routineExercise.findFirst({
        where: { id: routineExerciseId }
    });

    if (!ejercicioRutina) {
        throw new NotFoundError("El ejercicio no existe en la rutina");
    }

    if (ejercicioRutina.routineId !== routineId) {
        throw new BadRequestError("El ejercicio no pertenece a esta rutina");
    }

    const ejercicioEliminado =  await prisma.routineExercise.delete({
        where: { id: ejercicioRutina.id }
    });

    //Traemos todos los ejercicios restantes de la rutina
    const ejerciciosRestantes = await prisma.routineExercise.findMany({
        where: { routineId },
        orderBy: { orden: "asc" }
    });

    // Se asigna 1, 2, 3... según su nueva posición en el arreglo
    for (let i = 0; i < ejerciciosRestantes.length; i++) {
        await prisma.routineExercise.update({
            where: { id: ejerciciosRestantes[i].id },
            data: { orden: i + 1 }
        });
    }

    return ejercicioEliminado;
}