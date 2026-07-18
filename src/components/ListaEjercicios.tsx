import type { Ejercicio } from "../types/ejercicio"
import EjercicioCard from "./EjercicioCard"

type ListaEjerciciosProps = {
    ejercicios: Ejercicio[];
    onEditar: (ejericioId: string) => void;
    onEliminarEjercicio: (ejercicioId: string) => void;
}
export default function ListaEjercicios({ ejercicios, onEditar, onEliminarEjercicio}: ListaEjerciciosProps) {
    return (
        <>
            {ejercicios.length === 0 ? (
                <>
                    <p>Esta rutina aún está vacía. Comienza agregando tu primer ejercicio.</p>
                </>
            ) : (
                <>
                    {ejercicios.map(ejercicio => (
                        <EjercicioCard 
                            key={ejercicio.id}
                            ejercicio={ejercicio}
                            onEditar={onEditar}
                            onEliminarEjercicio={onEliminarEjercicio}
                        />
                    ))}
                </>
            )}
        </>
    )
}
