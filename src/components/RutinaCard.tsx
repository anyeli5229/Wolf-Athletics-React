import type { Rutina } from "../types/rutina";

type RutinaCardProps = {
  rutina: Rutina;
  onEliminar: (id: string) => void;
  onEditar: (id: string) => void;
}

export default function RutinaCard({ rutina, onEliminar, onEditar }: RutinaCardProps) {
    return (
        <>
            <h2>{rutina.nombre}</h2>

            <p>Intensidad: {rutina.intensidad}</p>

            <p>Duración: {rutina.duracion} minutos</p>

            <button>Entrar</button>

            <button onClick={() => onEditar(rutina.id)}>Editar</button>

            <button onClick={() => onEliminar(rutina.id)}>Eliminar</button>
        </>
    )
}
