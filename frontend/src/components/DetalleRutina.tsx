import { useState } from "react";
import type { Ejercicio } from "../types/ejercicio";
import type { EjercicioFormulario } from "../types/formulario";
import type { Rutina } from "../types/rutina";
import FormularioEjercicios from "./FormularioEjercicios";
import ListaEjercicios from "./ListaEjercicios";
import Button from "./ui/Button";
import Modal from "./ui/Modal";

type DetalleRutinaProps = {
    rutina: Rutina;
    onCrearEjercicio: (rutinaId: string, ejercicioNuevo: EjercicioFormulario) => void;
    onEditar: (rutinaId: string, ejercicioId: string) => void;
    ejercicioEditar: Ejercicio | null;
    onActualizaEjercicio: (
        rutinaId: string,
        ejercicioId: string,
        datosActualizados: EjercicioFormulario
    ) => void;
    cancelarEdicionEjercicio: () => void;
    onEliminarEjercicio: (rutinaId: string, ejercicioId: string) => void;
    onVolver: () => void;
};

export default function DetalleRutina({
    rutina,
    onCrearEjercicio,
    onEditar,
    ejercicioEditar,
    onActualizaEjercicio,
    cancelarEdicionEjercicio,
    onEliminarEjercicio,
    onVolver,
}: DetalleRutinaProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const abrirModalCrear = () => {
        cancelarEdicionEjercicio();
        setIsModalOpen(true);
    };

    const abrirModalEditar = (ejercicioId: string) => {
        onEditar(rutina.id, ejercicioId);
        setIsModalOpen(true);
    };

    const cerrarModal = () => {
        setIsModalOpen(false);
        cancelarEdicionEjercicio();
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-300 mt-5">
                <div>
                    <Button variant="ghost" size="sm" onClick={onVolver} className="mb-5">
                        ← Volver a rutinas
                    </Button>

                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-extrabold text-slate-700 flex items-center gap-3 mb-5">
                            {rutina.nombre}
                        </h2>
                    </div>

                    <div className="flex items-center gap-3 mt-2 text-sm text-slate-600">
                        <span className="px-2.5 py-0.5 rounded-full  border border-sky-400 text-sky-400">
                            <div className="flex items-center justify-between gap-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                                </svg>

                                {rutina.nivel}
                            </div>
                        </span>
                        <div className="flex items-center justify-between gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

                            {rutina.duracion} min
                        </div>
                    </div>
                </div>

                <div>
                    <Button variant="primary" onClick={abrirModalCrear}>
                        + Agregar Ejercicio
                    </Button>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold text-slate-500 mb-4">Ejercicios</h3>
                <ListaEjercicios
                    ejercicios={rutina.ejercicios}
                    onEditar={abrirModalEditar}
                    onEliminarEjercicio={(ejercicioId: string) => {
                        onEliminarEjercicio(rutina.id, ejercicioId);
                    }}
                    onCrearEjercicio={abrirModalCrear}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={cerrarModal}
                title={ejercicioEditar ? "Editar Ejercicio" : "Agregar Ejercicio"}
            >
                <FormularioEjercicios
                    onCrearEjercicio={(ejercicio) => {
                        onCrearEjercicio(rutina.id, ejercicio);
                        cerrarModal();
                    }}
                    onActualizaEjercicio={(ejercicioEditado: Ejercicio) => {
                        onActualizaEjercicio(rutina.id, ejercicioEditado.id, ejercicioEditado);
                        cerrarModal();
                    }}
                    ejercicioEditar={ejercicioEditar}
                    cancelarEdicionEjercicio={cerrarModal}
                />
            </Modal>
        </div>
    );
}