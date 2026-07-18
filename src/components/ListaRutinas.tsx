import type { Rutina } from "../types/rutina"
import RutinaCard from "./RutinaCard"

type ListaRutinasProps = {
    rutinas: Rutina[];
    onEntrar: (id: string) => void;
    onEditar: (id: string) => void;
    onEliminar: (id: string) => void;
}

export default function ListaRutinas({ rutinas, onEntrar, onEditar, onEliminar }: ListaRutinasProps) {
    return (
        <>
            {rutinas.length === 0 ? (
                <p>
                    No tienes rutinas creadas todavía 🐺
                </p>
            ) : (
                <section>
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
