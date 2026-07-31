import type { RutinaFormulario } from "../types/formulario";
import type { Rutina } from "../types/rutina";
import request from "./http";

export function obtenerRutinas() {
    return request<Rutina[]>("/rutinas");
}

export function crearRutina(datos: RutinaFormulario): Promise<Rutina> {
    return request<Rutina>("/rutinas", {
        method: "POST",
        body: JSON.stringify(datos)
    });
}

export function actualizarRutina(id: string, datos: RutinaFormulario): Promise<Rutina> {
    return request<Rutina>(`/rutinas/${id}`, {
        method: "PUT",
        body: JSON.stringify(datos)
    });
}

export function eliminarRutina(id: string): Promise<Rutina> {
    return request<Rutina>(`/rutinas/${id}`, {
        method: "DELETE"
    });
}