import { useEffect, useState } from "react";
import type { Ejercicio } from "../types/ejercicio";
import Input from "./ui/Input";
import Button from "./ui/Button";
import type { EjercicioFormulario } from "../types/formulario";

type FormularioEjercicioProps = {
    errorEjercicio: string;
    onCrearEjercicio: (datos: EjercicioFormulario) => Promise<boolean>;
    onActualizarEjercicio?: (ejercicioId: string, datos: EjercicioFormulario) => Promise<boolean>;
    cancelarEdicion?: () => void;
    cerrarModal?: () => void;
    ejercicioEditar?: Ejercicio | null;
}

export default function FormularioEjercicio({ errorEjercicio, onCrearEjercicio, onActualizarEjercicio, cancelarEdicion, cerrarModal, ejercicioEditar }: FormularioEjercicioProps) {
    
    const [formulario, setFormulario] = useState({
        nombre: "",
        descripcion: "",
        grupoMuscular: "",
        equipo: ""
    });

    const [errorLocal, setErrorLocal] = useState("");
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        if (ejercicioEditar) {
            setFormulario({
                nombre: ejercicioEditar.nombre || "",
                descripcion: ejercicioEditar.descripcion || "",
                grupoMuscular: ejercicioEditar.grupoMuscular || "",
                equipo: ejercicioEditar.equipo || ""
            });
        } else {
            setFormulario({
                nombre: "",
                descripcion: "",
                grupoMuscular: "",
                equipo: ""
            });
        }
        setErrorLocal("");
    }, [ejercicioEditar]);

    function manejarCambio(evento: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name, value } = evento.target;
        setFormulario((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    function validarFormulario() {
        if (!formulario.nombre.trim()) {
            return "El nombre del ejercicio es obligatorio.";
        }
        if (!formulario.grupoMuscular.trim()) {
            return "El grupo muscular es obligatorio.";
        }
        return null;
    }

    function manejarCancelar() {
        if (cancelarEdicion) cancelarEdicion();
        if (cerrarModal) cerrarModal();
    }

    async function handleSubmit(evento: React.FormEvent) {
        evento.preventDefault();

        const errorValidacion = validarFormulario();
        if (errorValidacion) {
            setErrorLocal(errorValidacion);
            return;
        }

        setErrorLocal("");
        setCargando(true);

        const datosLimpios = {
            nombre: formulario.nombre.trim(),
            descripcion: formulario.descripcion.trim(),
            grupoMuscular: formulario.grupoMuscular.trim(),
            equipo: formulario.equipo.trim()
        };

        try {
            if (ejercicioEditar && onActualizarEjercicio) {
                const exito = await onActualizarEjercicio(ejercicioEditar.id, datosLimpios);
                if (exito) {
                    manejarCancelar();
                }
            } else {
                const exito = await onCrearEjercicio(datosLimpios);
                if (exito) {
                    setFormulario({ nombre: "", descripcion: "", grupoMuscular: "", equipo: "" });
                    manejarCancelar();
                }
            }
        } finally {
            setCargando(false);
        }
    }

    const mensajeError = errorLocal || errorEjercicio;

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {mensajeError && (
                <div className="p-3 text-xs font-medium text-red-600 bg-red-50 border border-red-200/80 rounded-xl flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                    <span>{mensajeError}</span>
                </div>
            )}

            <Input
                name="nombre"
                label="Nombre del ejercicio"
                placeholder="Ej. Sentadilla Smith"
                value={formulario.nombre}
                onChange={manejarCambio}
                fullWidth
            />

            <div className="flex flex-col gap-1.5">
                <label className="block text-sm font-medium text-slate-700">
                    Grupo Muscular
                </label>
                <select
                    name="grupoMuscular"
                    value={formulario.grupoMuscular}
                    onChange={manejarCambio}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl text-slate-700 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-colors"
                >
                    <option value="">Selecciona un grupo muscular...</option>
                    <option value="Cuadríceps">Cuadríceps</option>
                    <option value="Isquiotibiales">Isquiotibiales</option>
                    <option value="Glúteo">Glúteo</option>
                    <option value="Pecho">Pecho</option>
                    <option value="Espalda">Espalda</option>
                    <option value="Hombros">Hombros</option>
                    <option value="Bíceps">Bíceps</option>
                    <option value="Tríceps">Tríceps</option>
                    <option value="Pantorrilla">Pantorrilla</option>
                    <option value="Core">Core / Abdomen</option>
                </select>
            </div>

            <Input
                name="equipo"
                label="Equipo / Máquina"
                placeholder="Ej. Icarian, Barra libre, Mancuernas"
                value={formulario.equipo}
                onChange={manejarCambio}
                fullWidth
            />

            <div className="flex flex-col gap-1.5">
                <label className="block text-sm font-medium text-slate-700">
                    Descripción / Notas
                </label>
                <textarea
                    name="descripcion"
                    rows={3}
                    placeholder="Ej. Hacer descansos de 3 a 4 minutos"
                    value={formulario.descripcion}
                    onChange={manejarCambio}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl text-slate-700 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-colors resize-none"
                />
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 mt-6 border-t border-slate-100">
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={manejarCancelar}
                    disabled={cargando}
                >
                    Cancelar
                </Button>

                <Button type="submit" size="sm" disabled={cargando}>
                    {cargando ? "Guardando..." : ejercicioEditar ? "Actualizar Ejercicio" : "Crear Ejercicio"}
                </Button>
            </div>
        </form>
    )
}