import EjercicioCard from "../components/EjercicioCard";
import { useEjercicios } from "../hooks/useEjercicios";
import Button from "../components/ui/Button";
import { useState } from "react";
import type { Ejercicio } from "../types/ejercicio";
import Modal from "../components/ui/Modal";
import FormularioEjercicio from "../components/FormularioEjercicio";
import Header from "../components/ui/Header";

export default function EjercicioPage() {
    const { ejercicios, crearEjercicio, ejercicioEditar, actualizarEjercicio, errorEjercicio, seleccionarEjercicioEditar, eliminarEjercicio, cancelarEdicionEjercicio, limpiarErrorEjercicio } = useEjercicios();

    const [ejercicioEliminar, setEjercicioEliminar] = useState<Ejercicio | null>(null);
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

    function solicitarEliminar(id: string) {
        const ejercicio = ejercicios.find(
            ejercicio => ejercicio.id === id
        );

        if (ejercicio) {
            setEjercicioEliminar(ejercicio);
        }
    }

    async function confirmarEliminar() {
        if (!ejercicioEliminar) return;

        const eliminado = await eliminarEjercicio(ejercicioEliminar.id);

        if (eliminado) {
            setEjercicioEliminar(null);
        }
    }

    return (
        <div className="max-w-7xl mx-auto p-6">

            <Header
                onAccionPrincipal={abrirModalCrear}
                textoBotonPrincipal="+ Nuevo Ejercicio"
                linkNavegacion={{
                    texto: "← Volver a Rutinas",
                    to: "/"
                }}
            />

            <main className="max-w-7xl mx-auto px-6 py-8">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200/80">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                            Catálogo de ejercicios
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Administra y explora los ejercicios disponibles para tus rutinas.
                        </p>
                    </div>

                    {ejercicios.length > 0 && (
                        <div className="self-start sm:self-auto">
                            <span className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200/80 rounded-xl shadow-xs">
                                {ejercicios.length} {ejercicios.length === 1 ? "ejercicio" : "ejercicios"}
                            </span>
                        </div>
                    )}
                </div>

                {errorEjercicio && (
                    <div className="mb-6 p-4 text-xs font-medium text-red-600 bg-red-50 border border-red-200/80 rounded-2xl flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                        <span>{errorEjercicio}</span>
                    </div>
                )}

                {ejercicios.length === 0 ? (
                    <div className="p-12 text-center bg-white border border-dashed border-slate-300 rounded-3xl shadow-xs">
                        <div className="inline-flex p-3 bg-sky-500/10 border border-sky-500/20 rounded-2xl text-sky-600 mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                        <p className="text-sm font-medium text-slate-700">
                            No hay ejercicios registrados.
                        </p>
                        <p className="text-xs text-slate-400 mt-1 mb-4">
                            Crea un nuevo ejercicio para comenzar a armar tu catálogo.
                        </p>
                        
                        <Button size="sm" onClick={abrirModalCrear}>
                            + Agregar primer ejercicio
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {ejercicios.map((ejercicio) => (
                            <EjercicioCard
                                key={ejercicio.id}
                                ejercicio={ejercicio}
                                onEditar={abrirModalEditar}
                                onEliminar={solicitarEliminar}
                            />
                        ))}
                    </div>
                )}
            </main>

            <Modal
                isOpen={isModalOpen}
                onClose={cerrarModal}
                title={ejercicioEditar ? "Editar Ejercicio" : "Agregar Ejercicio"}
            >
                <FormularioEjercicio
                    errorEjercicio={errorEjercicio}
                    onCrearEjercicio={crearEjercicio}
                    onActualizarEjercicio={actualizarEjercicio}
                    cancelarEdicion={cancelarEdicionEjercicio}
                    cerrarModal={cerrarModal}
                    ejercicioEditar={ejercicioEditar}
                />
            </Modal>

            <Modal
                isOpen={ejercicioEliminar !== null}
                onClose={() => setEjercicioEliminar(null)}
                title="Eliminar ejercicio"
            >
                <div className="space-y-5">
                    <p className="text-sm text-slate-600">
                        ¿Estás seguro de que deseas eliminar este ejercicio?
                    </p>

                    <p className="text-sm text-red-600">
                        Este ejercicio también se eliminará de todas las rutinas donde esté utilizado. Esta acción no se puede deshacer.
                    </p>

                    <div className="flex text-center justify-between gap-2">
                        <Button
                            variant="ghost"
                            onClick={() => setEjercicioEliminar(null)}
                            className="text-sm"
                        >
                            Cancelar
                        </Button>

                        <Button
                            variant="danger-ghost"
                            onClick={confirmarEliminar}
                            className="text-sm"
                        >
                            Eliminar ejercicio
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}