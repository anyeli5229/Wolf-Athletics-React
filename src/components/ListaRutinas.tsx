import type { Rutina } from "../types/rutina"
import RutinaCard from "./RutinaCard"

type ListaRutinasProps = {
    rutinas: Rutina[];
    onEliminar: (id: string) => void;
    onEditar: (id: string) => void;
}

export default function ListaRutinas({ rutinas, onEliminar, onEditar }: ListaRutinasProps) {
    if (rutinas.length === 0) {

        return (
            <p>
                No tienes rutinas creadas todavía 🐺
            </p>
        );

    } else {
        return (
            <section>
                {rutinas.map(rutina => (
                    <RutinaCard
                        key={rutina.id}
                        rutina={rutina}
                        onEliminar={onEliminar}
                        onEditar={onEditar}
                    />
                ))}
            </section>
        )
    }
}
