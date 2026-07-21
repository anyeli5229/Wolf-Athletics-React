import type { Ejercicio } from "../types/ejercicio";
import type { EjercicioFormulario } from "../types/formulario";
import type { Rutina } from "../types/rutina"
import FormularioEjercicios from "./FormularioEjercicios";
import ListaEjercicios from "./ListaEjercicios";

type DetalleRutinaProps = {
    rutina: Rutina;
    onCrearEjercicio: (rutinaId: string, ejercicioNuevo: EjercicioFormulario) => void;
    onEditar: (ejericioId: string) => void;
    ejercicioEditar: Ejercicio | null;
    onActualizaEjercicio: (rutinaId: string, ejercicioId: string, datosActualizados: EjercicioFormulario) => void;
    cancelarEdicionEjercicio: () => void;
    onEliminarEjercicio: (rutinaId: string, ejercicioId: string) => void;
    onVolver: () => void;
}

export default function DetalleRutina({ rutina, onCrearEjercicio, onEditar, ejercicioEditar, onActualizaEjercicio, cancelarEdicionEjercicio, onEliminarEjercicio, onVolver}: DetalleRutinaProps) {
    return (
        <>
            <h2>{rutina.nombre}</h2>

            <p>Intensidad: {rutina.intensidad}</p>
            <p>Duración: {rutina.duracion}</p>


            <h3>Ejercicios</h3>
            <ListaEjercicios
                ejercicios={rutina.ejercicios}
                onEditar={onEditar}
                onEliminarEjercicio={(ejercicioId: string) => {
                    onEliminarEjercicio(rutina.id, ejercicioId)
                }}
                onCrearEjercicio={() => {}}
            />
            
            <FormularioEjercicios
                onCrearEjercicio={(ejercicio) => {
                    onCrearEjercicio(rutina.id, ejercicio)
                }}
                onActualizaEjercicio={(ejercicioEditado: Ejercicio) => {
                    onActualizaEjercicio(rutina.id, ejercicioEditado.id, ejercicioEditado)
                }}
                ejercicioEditar={ejercicioEditar}
                cancelarEdicionEjercicio={cancelarEdicionEjercicio}
            />
            <button onClick={() => onVolver()}>Volver</button>
        </>
    )
}
