import { useEffect, useState } from "react";
import type { EjercicioFormulario } from "../types/formulario";
import type { Ejercicio } from "../types/ejercicio";

type FormularioEjerciciosProps = {
    onCrearEjercicio: (ejercicioNuevo: EjercicioFormulario) => void;
    onActualizaEjercicio: (ejercicioEditado: Ejercicio) => void;
    cancelarEdicionEjercicio: () => void;
    ejercicioEditar: Ejercicio | null;
}
export default function FormularioEjercicios({ onCrearEjercicio, onActualizaEjercicio, cancelarEdicionEjercicio, ejercicioEditar }: FormularioEjerciciosProps) {

    const [formularioEjercicio, setFormularioEjercicio] = useState({
        nombre: "",
        series: "",
        repeticiones: "",
        peso: ""
    });

    const [error, setError] = useState("");

    useEffect(() => {
        if (ejercicioEditar) {
            setFormularioEjercicio({
                nombre: ejercicioEditar.nombre,
                series: ejercicioEditar.series.toString(),
                repeticiones: ejercicioEditar.repeticiones.toString(),
                peso: ejercicioEditar.peso.toString()
            })
        } else {
            setFormularioEjercicio({
                nombre: "",
                series: "",
                repeticiones: "",
                peso: ""
            })
        }
        setError("");
    }, [ejercicioEditar]);

    function manejarCambio(evento: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = evento.target;
        setFormularioEjercicio((anterior) => ({
            ...anterior,
            [name]: value
        }))
    }

    function validarFormulario() {
        if (formularioEjercicio.nombre.trim() === "") {
            return "El nombre del ejercicio es obligatorio";
        }
        if (+formularioEjercicio.series <= 0) {
            return "Las series del ejercicio son obligatorias";
        }
        if (+formularioEjercicio.repeticiones <= 0) {
            return "Las repeticiones del ejercicio son obligatorias";
        }
        if (+formularioEjercicio.peso <= 0) {
            return "El peso del ejercicio es obligatorio";
        }

        return null;
    }

    function handleSubmit(evento: React.SubmitEvent) {
        evento.preventDefault();

        const mensajeError = validarFormulario();
        if (mensajeError) {
            setError(mensajeError);
            return;
        }

        const datosFormulario: EjercicioFormulario = {
            nombre: formularioEjercicio.nombre,
            series: +formularioEjercicio.series,
            repeticiones: +formularioEjercicio.repeticiones,
            peso: +formularioEjercicio.peso
        };

        if (ejercicioEditar) {
            onActualizaEjercicio({
                id: ejercicioEditar.id,
                ...datosFormulario
            })
        } else {
            onCrearEjercicio(formularioEjercicio);
        }

        cancelarEdicionEjercicio();
        
        setFormularioEjercicio({
            nombre: "",
            series: "",
            repeticiones: "",
            peso: ""
        })
        setError("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="nombre"
                value={formularioEjercicio.nombre}
                onChange={manejarCambio}
                placeholder="Nombre del ejercicio"
            />

            <input
                name="series"
                value={formularioEjercicio.series}
                onChange={manejarCambio}
                placeholder="Series"
            />

            <input
                name="repeticiones"
                value={formularioEjercicio.repeticiones}
                onChange={manejarCambio}
                placeholder="Repeticiones"
            />

            <input
                name="peso"
                value={formularioEjercicio.peso}
                onChange={manejarCambio}
                placeholder="Peso"
            />

            {error && (
                <p>
                    {error}
                </p>
            )}

            <button type="submit">
                {ejercicioEditar ? "Actualizar Ejercicio" : "Agregar Ejercicio"}
            </button>

            {ejercicioEditar && (
                <button
                    type="button"
                    onClick={cancelarEdicionEjercicio}
                >
                    Cancelar
                </button>
            )}

        </form>
    )
}
