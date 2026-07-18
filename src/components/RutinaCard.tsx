import type { Rutina } from "../types/rutina";

type RutinaCardProps = {
  rutina: Rutina;
  onEntrar: (id: string) => void;
  onEditar: (id: string) => void;
  onEliminar: (id: string) => void;
}

export default function RutinaCard({ rutina, onEntrar, onEditar, onEliminar }: RutinaCardProps) {
    return (
        <>
            <h2>{rutina.nombre}</h2>

            <p>Intensidad: {rutina.intensidad}</p>

            <p>Duración: {rutina.duracion} minutos</p>

            <button onClick={() => onEntrar(rutina.id)}>Entrar</button>

            <button onClick={() => onEditar(rutina.id)}>Editar</button>

            <button onClick={() => onEliminar(rutina.id)}>Eliminar</button>
        </>
    )
}
