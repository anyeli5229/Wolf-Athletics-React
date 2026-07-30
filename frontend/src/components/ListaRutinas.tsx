import type { Rutina } from "../types/rutina"
import RutinaCard from "./RutinaCard"
import Card from "./ui/Card";

type ListaRutinasProps = {
    rutinas: Rutina[];
    onEntrar: (id: string) => void;
    onEditar: (id: string) => void;
    onEliminar: (id: string) => void;
    onCrearRutina?: () => void;
}

export default function ListaRutinas({ rutinas, onEntrar, onEditar, onEliminar, onCrearRutina }: ListaRutinasProps) {
    return (
        <>
            {rutinas.length === 0 ? (
                <Card className="flex flex-col items-center justify-center p-10 my-8 mx-5 rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 text-center backdrop-blur-sm">

                    <div className="relative mb-4">

                        <div className="absolute inset-0 rounded-full bg-sky-500 blur-md animate-pulse"></div>

                        <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-slate-700 text-sky-400 text-3xl shadow-lg">
                            🐺
                        </div>
                    </div>

                    <h3 className="text-lg font-semibold text-slate-400 mb-1">
                        No tienes rutinas aún.
                    </h3>

                    <p className="text-sm text-slate-300 max-w-sm mb-6">
                        Comienza creando tu primer plan de entrenamiento para empezar a darle seguimiento a tu progreso.
                    </p>

                    {onCrearRutina && (
                        <button
                            onClick={onCrearRutina}
                            className="px-4 py-2 text-sm font-medium text-sky-400 bg-sky-400/10 border border-sky-400/30 rounded-lg hover:bg-sky-400/20 transition-all duration-200"
                        >
                            + Crear primera rutina
                        </button>
                    )}
                </Card>
            ) : (
                <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 mx-5">
                    {rutinas.map(rutina => (
                        <RutinaCard
                            key={rutina.id}
                            rutina={rutina}
                            onEntrar={onEntrar}
                            onEditar={onEditar}
                            onEliminar={onEliminar}
                        />
                    ))}
                </section>
            )}
        </>
    )
}
