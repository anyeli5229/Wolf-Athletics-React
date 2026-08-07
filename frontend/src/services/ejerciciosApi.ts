import type { Ejercicio } from "../types/ejercicio";
import type { EjercicioFormulario } from "../types/formulario";
import request from "./http";

export function obtenerEjercicios(routineId?: string) {
    const query = routineId ? `?routineId=${routineId}` : "";
    return request<Ejercicio[]>(`/ejercicios${query}`);
}

export function crearEjercicio(datos: EjercicioFormulario) {
    return request<Ejercicio>("/ejercicios", {
        method: "POST",
        body: JSON.stringify(datos)
    });
}

export function actualizarEjercicio(ejercicioId:string, datos: EjercicioFormulario) {
    return request<Ejercicio>(`/ejercicios/${ejercicioId}`, {
        method: "PUT",
        body: JSON.stringify(datos)
    });
}

export function eliminarEjercicio(ejercicioId:string) {
    return request<Ejercicio>(`/ejercicios/${ejercicioId}`, {
        method: "DELETE"
    });
}