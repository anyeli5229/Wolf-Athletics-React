import prisma from "../config/prisma";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { actualizarRutinaEjercicioInput, rutinaEjercicioInput } from "../schemas/rutinaEjercicio.schema";

async function obtenerEjercicioDeRutina(routineId: string, routineExerciseId: string) {//Verifica que el ejercicio pertenezca a la rutina
    const ejercicioRutina = await prisma.routineExercise.findUnique({
        where: { id: routineExerciseId }
    });

    if (!ejercicioRutina) {
        throw new NotFoundError("El ejercicio no existe en la rutina");
    }

    if (ejercicioRutina.routineId !== routineId) {
        throw new BadRequestError("El ejercicio no pertenece a esta rutina");
    }

    return ejercicioRutina;
}

async function verificarRutinaExiste(routineId: string, userId: string) {//Verifica que la rutina pertenece al usuario
    const rutinaExiste = await prisma.routine.findFirst({
        where: { id: routineId, userId }
    })

    if (!rutinaExiste) {
        throw new NotFoundError("La rutina especificada no existe");
    }

}

export async function obtenerRutinaEjercicios(routineId: string, userId:string) {

    const [_, ejercicios] = await Promise.all([
        verificarRutinaExiste(routineId, userId),
        prisma.routineExercise.findMany({
            where: { routineId },
            orderBy: {
                orden: "asc"
            },
            include: {
                exercise: true
            }
        })
    ])

    return ejercicios;
}

export async function crearRutinaEjercicio(datos: { routineId: string } & rutinaEjercicioInput, userId:string) {

    const [_, ejercicioExiste, yaExisteEnRutina] = await Promise.all([
        verificarRutinaExiste(datos.routineId, userId),
        prisma.exercise.findFirst({ 
            where: { id: datos.exerciseId,
                OR: [
                    { createdBy : null},
                    { createdBy : userId}
                ]
             } 
        }),
        prisma.routineExercise.findFirst({
            where: {
                routineId: datos.routineId,
                exerciseId: datos.exerciseId
            }
        })
    ]);


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

export async function actualizarEjercicioRutina(routineId: string, routineExerciseId: string, datos: actualizarRutinaEjercicioInput, userId:string) {

    await verificarRutinaExiste(routineId, userId);

    const ejercicioDeLaRutina = await obtenerEjercicioDeRutina(routineId, routineExerciseId);

    return await prisma.routineExercise.update({
        where: { id: ejercicioDeLaRutina.id },
        data: datos,
        include: { exercise: true }
    });
}


export async function eliminarEjercicioRutina(routineId: string, routineExerciseId: string, userId: string) {

    await verificarRutinaExiste(routineId, userId);

    const ejercicioRutinaAEliminar = await obtenerEjercicioDeRutina(routineId, routineExerciseId);

    return await prisma.$transaction(async transaccion => {
        const ejercicioEliminadoDeRutina = await transaccion.routineExercise.delete({
            where: { id: routineExerciseId }
        });

        await transaccion.routineExercise.updateMany({
            where: {
                routineId: routineId,
                orden: {
                    gt: ejercicioRutinaAEliminar.orden // gt = Greater Than 
                }
            },
            data: {
                orden: {
                    decrement: 1 // Resta 1 automáticamente en la base de datos
                }
            }
        });

        return ejercicioEliminadoDeRutina;
    });

}