import type { Ejercicio } from "../types/ejercicio"
import EjercicioCard from "./EjercicioCard"
import Card from "./ui/Card";

type ListaEjerciciosProps = {
    ejercicios: Ejercicio[];
    onEditar: (ejericioId: string) => void;
    onEliminarEjercicio: (ejercicioId: string) => void;
    onCrearEjercicio?: () => void; 
}
export default function ListaEjercicios({ ejercicios, onEditar, onEliminarEjercicio, onCrearEjercicio }: ListaEjerciciosProps) {
    return (
        <>
            {ejercicios.length === 0 ? (
                <Card className="flex flex-col items-center justify-center p-10 my-8 mx-5 rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 text-center backdrop-blur-sm">

                    <div className="relative mb-4">

                        <div className="absolute inset-0 rounded-full bg-sky-500 blur-md animate-pulse"></div>

                        <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-slate-700 text-sky-400 text-3xl shadow-lg">
                            🦾
                        </div>
                    </div>

                    <h3 className="text-lg font-semibold text-slate-400 mb-1">
                        No tienes ejercicios registrados aún.
                    </h3>

                    <p className="text-sm text-slate-300 max-w-sm mb-6">
                        Comienza creando uno.
                    </p>

                    {onCrearEjercicio && (
                        <button
                            onClick={onCrearEjercicio}
                            className="px-4 py-2 text-sm font-medium text-sky-400 bg-sky-400/10 border border-sky-400/30 rounded-lg hover:bg-sky-400/20 transition-all duration-200"
                        >
                            + Crear primer Ejercicio
                        </button>
                    )}
                </Card>
            ) : (
                <section className="grid gap-6 md:grid-cols-2 mx-5">
                    {ejercicios.map(ejercicio => (
                        <EjercicioCard
                            key={ejercicio.id}
                            ejercicio={ejercicio}
                            onEditar={onEditar}
                            onEliminarEjercicio={onEliminarEjercicio}
                        />
                    ))}
                </section>
            )}
        </>
    )
}
