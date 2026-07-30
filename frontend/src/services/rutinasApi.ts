import type { RutinaFormulario } from "../types/formulario";
import type { Rutina } from "../types/rutina";


const API_URL = "http://localhost:3000/api/rutinas";

export async function obtenerRutinas(): Promise<Rutina[]> {
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) {
        throw new Error('Error al obtener las rutinas');
    }

    return respuesta.json();
}

export async function crearRutina(datos: RutinaFormulario): Promise<Rutina> {
    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    })

    if (!respuesta.ok) {
        throw new Error('Error al crear la rutina');
    }

    return respuesta.json();
}

export async function actualizarRutina(id: string, datos: RutinaFormulario): Promise<Rutina> {
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    })

    if (!respuesta.ok) {
        throw new Error('Error al actualizar la rutina');
    }

    return respuesta.json();
}

export async function eliminarRutina(id: string): Promise<Rutina> {
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (!respuesta.ok) {
        throw new Error('Error al eliminar la rutina');
    }

    return respuesta.json();
}