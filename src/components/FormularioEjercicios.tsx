import { useEffect, useState } from "react";
import type { EjercicioFormulario } from "../types/formulario";
import type { Ejercicio } from "../types/ejercicio";
import Input from "./ui/Input";
import Button from "./ui/Button";

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
        if (!formularioEjercicio.series || +formularioEjercicio.series <= 0) {
            return "Las series del ejercicio son obligatorias";
        }
        if (!formularioEjercicio.repeticiones || +formularioEjercicio.repeticiones <= 0) {
            return "Las repeticiones del ejercicio son obligatorias";
        }
        if (!formularioEjercicio.peso || +formularioEjercicio.peso <= 0) {
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
        <form onSubmit={handleSubmit} className="space-y-4">

            {error && (
                <div className="p-3 text-xs font-medium text-red-400 bg-red-500/10 border border-red-500 rounded-xl flex items-center gap-2">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                    </span>

                    <span>{error}</span>
                </div>
            )}

            <Input
                name="nombre"
                label="Nombre del ejercicio"
                placeholder="Ej. Sentadilla, Biceps con mancuerna, jalón al pecho"
                value={formularioEjercicio.nombre}
                onChange={manejarCambio}
                fullWidth
            />

            <Input
                name="series"
                label="Series del ejercicio"
                placeholder="Ej. 3"
                value={formularioEjercicio.series}
                onChange={manejarCambio}
                fullWidth
            />

            <Input
                name="repeticiones"
                label="Repeticiones del ejercicio"
                placeholder="Ej. 10"
                value={formularioEjercicio.repeticiones}
                onChange={manejarCambio}
                fullWidth
            />

            <Input
                name="peso"
                label="Peso del ejercicio"
                placeholder="Ej. 10"
                value={formularioEjercicio.peso}
                onChange={manejarCambio}
                fullWidth
            />

            <div className="flex items-center justify-end gap-2 pt-4 mt-6">

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={cancelarEdicionEjercicio}
                >
                    Cancelar
                </Button>

                <Button
                    type="submit"
                    size="sm"
                >
                    {ejercicioEditar ? "Actualizar Ejercicio" : "Agregar Ejercicio"}
                </Button>


            </div>

        </form>
    )
}
