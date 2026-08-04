import type { Ejercicio } from "./ejercicio";

export type RutinaEjercicio = {
    id: string;
    routineId: string;
    exerciseId: string;
    orden: number;
    series: number;
    repeticiones: number;
    pesoSugerido: number;
    descanso: number;
    rir: number;
    notas?: string;
    exercise: Ejercicio
};