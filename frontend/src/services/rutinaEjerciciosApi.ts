import type { EjercicioEnRutinaFormulario } from "../types/formulario";
import type { RutinaEjercicio } from "../types/rutinaEjercicio";
import request from "./http";

export function obtenerEjerciciosDeRutina(routineId: string) {
    return request<RutinaEjercicio[]>(`/rutinas/${routineId}/ejercicios`)
}

export function agregarEjercicioEnRutina(routineId: string, datos: EjercicioEnRutinaFormulario) : Promise<RutinaEjercicio> {
    return request<RutinaEjercicio>(`/rutinas/${routineId}/ejercicios`, {
        method: "POST",
        body: JSON.stringify(datos)
    });
}

export function actualizarEjercicioDeRutina(routineId: string, routineExerciseId: string, datos: EjercicioEnRutinaFormulario) : Promise<RutinaEjercicio> {
    return request<RutinaEjercicio>(`/rutinas/${routineId}/ejercicios/${routineExerciseId}`, {
        method: "PUT",
        body: JSON.stringify(datos)
    });
}

export function eliminarEjercicioDeRutina(routineId: string, routineExerciseId: string) : Promise<RutinaEjercicio> {
    return request<RutinaEjercicio>(`/rutinas/${routineId}/ejercicios/${routineExerciseId}`, {
        method: "DELETE"
    });
}