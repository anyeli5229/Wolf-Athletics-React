import type { Rutina } from "../types/rutina";

type RutinaCardProps = {
  rutina: Rutina;
  onEliminar: (id: string) => void;
}

export default function RutinaCard({ rutina, onEliminar }: RutinaCardProps) {
    return (
        <>
            <h2>{rutina.nombre}</h2>

            <p>Intensidad: {rutina.intensidad}</p>

            <p>Duración: {rutina.duracion} minutos</p>

            <button>Entrar</button>

            <button>Editar</button>

            <button onClick={() => onEliminar(rutina.id)}>Eliminar</button>
        </>
    )
}
