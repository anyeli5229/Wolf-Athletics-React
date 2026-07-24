import { Rutina } from "../types/rutina";

let rutinas: Rutina[] = [
    {
        id: "1",
        nombre: "Pierna",
        intensidad: "Alta",
        duracion: 60
    },
    {
        id: "2",
        nombre: "Push",
        intensidad: "Media",
        duracion: 45
    }
];

function buscarRutina(id: string) {
    return rutinas.find(rutina => rutina.id === id);
}


export function obtenerTodasLasRutinas() {
    return rutinas;
}

export function crearRutina(datos: Omit<Rutina, "id">) {
    const nuevaRutina = {
        id: crypto.randomUUID(),
        ...datos
    };

    rutinas.push(nuevaRutina);

    return nuevaRutina;
}

export function actualizarRutina(id: string, datosActualizados: Omit<Rutina, 'id'>) {
    const rutina = buscarRutina(id);
    if(!rutina) return null;
    Object.assign(rutina, datosActualizados);
    return rutina;
}

export function eliminarRutina(id:string) {
    const rutina = buscarRutina(id);
    if(!rutina) return null;
    
    rutinas = rutinas.filter(rutina => rutina.id !== id);

    return rutina;
}