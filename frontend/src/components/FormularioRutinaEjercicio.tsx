import { useEffect, useState } from "react";
import type { EjercicioEnRutinaFormulario } from "../types/formulario";
import type { RutinaEjercicio } from "../types/rutinaEjercicio";
import type { Ejercicio } from "../types/ejercicio";
import Input from "./ui/Input";
import Button from "./ui/Button";

type FormularioEjerciciosProps = {
    ejerciciosCatalogo: Ejercicio[]; // Lista para llenar el <select>
    errorEjercicio: string;
    onCrearEjercicio: (ejercicioNuevo: EjercicioEnRutinaFormulario) => Promise<boolean>;
    onActualizaEjercicio: (id: string, datos: EjercicioEnRutinaFormulario) => void;
    cancelarEdicionEjercicio: () => void;
    ejercicioEditar: RutinaEjercicio | null;
}

export default function FormularioRutinaEjercicio({ ejerciciosCatalogo, errorEjercicio, onCrearEjercicio, onActualizaEjercicio, cancelarEdicionEjercicio, ejercicioEditar }: FormularioEjerciciosProps) {

    const [formularioEjercicio, setFormularioEjercicio] = useState({
        exerciseId: "",
        series: "",
        repeticiones: "",
        pesoSugerido: "",
        descanso: "60",
        rir: "2"
    });

    const [error, setError] = useState("");

    useEffect(() => {
        if (ejercicioEditar) {
            setFormularioEjercicio({
                exerciseId: ejercicioEditar.exerciseId,
                series: ejercicioEditar.series.toString(),
                repeticiones: ejercicioEditar.repeticiones.toString(),
                pesoSugerido: ejercicioEditar.pesoSugerido ? ejercicioEditar.pesoSugerido.toString() : "",
                descanso: ejercicioEditar.descanso ? ejercicioEditar.descanso.toString() : "60",
                rir: ejercicioEditar.rir !== undefined ? ejercicioEditar.rir.toString() : "2"
            });
        } else {
            setFormularioEjercicio({
                exerciseId: "",
                series: "",
                repeticiones: "",
                pesoSugerido: "",
                descanso: "60",
                rir: "2"
            });
        }
        setError("");
    }, [ejercicioEditar]);

    function manejarCambio(evento: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = evento.target;
        setFormularioEjercicio((anterior) => ({
            ...anterior,
            [name]: value
        }));
    }

    function validarFormulario() {
        if (!ejercicioEditar && !formularioEjercicio.exerciseId) {
            return "Debes seleccionar un ejercicio del catálogo";
        }
        if (!formularioEjercicio.series || +formularioEjercicio.series <= 0) {
            return "Las series del ejercicio son obligatorias y deben ser mayores a 0";
        }
        if (!formularioEjercicio.repeticiones || +formularioEjercicio.repeticiones <= 0) {
            return "Las repeticiones del ejercicio son obligatorias y deben ser mayores a 0";
        }
        if (formularioEjercicio.pesoSugerido === "" || +formularioEjercicio.pesoSugerido < 0) {
            return "El peso del ejercicio es obligatorio y debe ser mayor a cero"
        }
        return null;
    }

    async function handleSubmit(evento: React.FormEvent) {
        evento.preventDefault();

        const mensajeError = validarFormulario();
        if (mensajeError) {
            setError(mensajeError);
            return;
        }

        const datosFormulario: EjercicioEnRutinaFormulario = {
            exerciseId: formularioEjercicio.exerciseId,
            series: Number(formularioEjercicio.series),
            repeticiones: Number(formularioEjercicio.repeticiones),
            pesoSugerido: Number(formularioEjercicio.pesoSugerido),
            descanso: Number(formularioEjercicio.descanso),
            rir: Number(formularioEjercicio.rir)
        };

        if (ejercicioEditar) {
            onActualizaEjercicio(
                ejercicioEditar.id,
                datosFormulario
            );

            cancelarEdicionEjercicio();
            setError("");
        } else {
            const creado = await onCrearEjercicio(datosFormulario);

            if (creado) {
                cancelarEdicionEjercicio();
                setError("");
            }
        }
    }

    const sinEjerciciosDisponibles = !ejercicioEditar && ejerciciosCatalogo.length === 0;

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            {sinEjerciciosDisponibles && (
                <div className="p-3 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-xl">
                    Ya has agregado todos los ejercicios disponibles a esta rutina.
                </div>
            )}

            {(error || errorEjercicio) && (
                <div className="p-3 text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                    <span>{error || errorEjercicio}</span>
                </div>
            )}

            {!ejercicioEditar ? (
                <div className="flex flex-col gap-1.5">
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Ejercicio</label>
                    <select
                        name="exerciseId"
                        value={formularioEjercicio.exerciseId}
                        onChange={manejarCambio}
                        className="w-full px-3 py-2 text-sm bg-white border border-gray-400 rounded-xl text-gray-500 focus:outline-none focus:border-gray-500"
                        disabled={sinEjerciciosDisponibles}
                    >
                        <option value="">{sinEjerciciosDisponibles ? "No hay más ejercicios disponibles" : "Selecciona un ejercicio..."}</option>
                        {ejerciciosCatalogo.map((e) => (
                            <option key={e.id} value={e.id}>
                                {e.nombre} ({e.grupoMuscular})
                            </option>
                        ))}
                    </select>
                </div>
            ) : (
                <div className="p-3 rounded-xl bg-white border border-gray-400">
                    <span className="text-xs text-zinc-400 block">Editando ejercicio:</span>
                    <span className="text-sm font-semibold text-sky-600">
                        {ejercicioEditar.exercise?.nombre || "Ejercicio seleccionado"}
                    </span>
                </div>
            )}

            <Input
                name="series"
                label="Series"
                placeholder="Ej. 3"
                value={formularioEjercicio.series}
                onChange={manejarCambio}
                fullWidth
            />

            <Input
                name="repeticiones"
                label="Repeticiones"
                placeholder="Ej. 10"
                value={formularioEjercicio.repeticiones}
                onChange={manejarCambio}
                fullWidth
            />

            <Input
                name="pesoSugerido"
                label="Peso sugerido (kg)"
                placeholder="Ej. 60"
                value={formularioEjercicio.pesoSugerido}
                onChange={manejarCambio}
                fullWidth
            />

            <Input
                name="descanso"
                label="Descanso (segundos)"
                placeholder="Ej. 60"
                value={formularioEjercicio.descanso}
                onChange={manejarCambio}
                fullWidth
            />

            <Input
                name="rir"
                label="RIR"
                placeholder="Ej. 2"
                value={formularioEjercicio.rir}
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

                <Button type="submit" size="sm" disabled={sinEjerciciosDisponibles}>
                    {ejercicioEditar ? "Actualizar Ejercicio" : "Agregar Ejercicio"}
                </Button>
            </div>
        </form>
    )
}