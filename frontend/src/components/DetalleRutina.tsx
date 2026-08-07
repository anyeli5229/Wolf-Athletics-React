import { useState } from "react";
import type { Rutina } from "../types/rutina";
import ListaEjercicios from "./ListaEjercicios";
import Modal from "./ui/Modal";
import type { useRutinaEjercicios } from "../hooks/useRutinaEjercicios";
import FormularioRutinaEjercicio from "./FormularioRutinaEjercicio";
import Header from "./ui/Header";

type EjerciciosRutinaHookProps = ReturnType<typeof useRutinaEjercicios>;

export type DetalleRutinaProps = {
    rutina: Rutina;
    onVolver: () => void;
} & EjerciciosRutinaHookProps;

export default function DetalleRutina({ rutina, ejercicios, ejerciciosCatalogo, errorEjercicio, limpiarErrorEjercicio, crearEjercicio, seleccionarEjercicioEditar, ejercicioEditar, actualizarEjercicio, cancelarEdicionEjercicio, eliminarEjercicio }: DetalleRutinaProps) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const abrirModalCrear = () => {
        cancelarEdicionEjercicio();
        setIsModalOpen(true);
    };

    const abrirModalEditar = (ejercicioId: string) => {
        seleccionarEjercicioEditar(ejercicioId);
        setIsModalOpen(true);
    };

    const cerrarModal = () => {
        setIsModalOpen(false);
        limpiarErrorEjercicio();
        cancelarEdicionEjercicio();
    };

    const sinEjerciciosEnCatalogo = ejerciciosCatalogo.length === 0;

    return (
        <div className="min-h-screen bg-slate-50/50">
            <Header
                onAccionPrincipal={abrirModalCrear}
                textoBotonPrincipal={sinEjerciciosEnCatalogo ? "Sin ejercicios disponibles" : "+ Agregar Ejercicio"}
                mostrarBotonPrincipal={!sinEjerciciosEnCatalogo}
                linkNavegacion={{
                    texto: "← Volver a rutinas",
                    to: "/"
                }}
            />

            <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                            {rutina.nombre}
                        </h1>

                        <div className="flex items-center gap-3 mt-3 text-sm text-slate-600">
                            <span className="px-3 py-1 rounded-xl border border-sky-400/50 bg-sky-500/10 text-sky-600 font-semibold text-xs flex items-center gap-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                                </svg>
                                {rutina.nivel}
                            </span>

                            <span className="px-3 py-1 rounded-xl border border-slate-200 bg-white text-slate-600 font-semibold text-xs flex items-center gap-1.5 shadow-xs">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-slate-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                {rutina.duracion} min
                            </span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-extrabold text-slate-700 tracking-tight mb-4">
                        Ejercicios asignados
                    </h3>
                    <ListaEjercicios
                        ejercicios={ejercicios}
                        onEditar={abrirModalEditar}
                        onEliminarEjercicio={(ejercicioId: string) => {
                            eliminarEjercicio(ejercicioId);
                        }}
                        onCrearEjercicio={abrirModalCrear}
                    />
                </div>
            </main>

            <Modal
                isOpen={isModalOpen}
                onClose={cerrarModal}
                title={ejercicioEditar ? "Editar Ejercicio" : "Agregar Ejercicio"}
            >
                <FormularioRutinaEjercicio
                    ejerciciosCatalogo={ejerciciosCatalogo}
                    errorEjercicio={errorEjercicio}
                    onCrearEjercicio={crearEjercicio}
                    onActualizaEjercicio={(ejercicioId, datos) => {
                        actualizarEjercicio(ejercicioId, datos);
                        cerrarModal();
                    }}
                    ejercicioEditar={ejercicioEditar}
                    cancelarEdicionEjercicio={cerrarModal}
                />
            </Modal>
        </div>
    )
}