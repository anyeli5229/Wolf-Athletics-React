import type { Ejercicio } from "../types/ejercicio"

type EjercicioCardProps = {
    ejercicio: Ejercicio;
    onEditar: (ejericioId: string) => void;
    onEliminarEjercicio: (ejercicioId: string) => void;
}

export default function EjercicioCard({ejercicio, onEditar, onEliminarEjercicio} : EjercicioCardProps) {
  return (
    <>
        <h4>{ejercicio.nombre}</h4>
        <p>Series: {ejercicio.series}</p>
        <p>Repeticiones: {ejercicio.repeticiones}</p>
        <p>Peso: {ejercicio.peso} Kg</p>

        <button onClick={() => onEditar(ejercicio.id)}>Editar</button>
        <button onClick={() => onEliminarEjercicio(ejercicio.id)}>Eliminar</button>
    </>
  )
}
