import type { RutinaEjercicio } from "../types/rutinaEjercicio";
import Button from "./ui/Button";
import Card from "./ui/Card";

type EjercicioCardProps = {
  ejercicio: RutinaEjercicio;
  onEditar: (ejercicioId: string) => void;
  onEliminarEjercicio: (ejercicioId: string) => void;
};

export default function EjercicioCard({ ejercicio, onEditar, onEliminarEjercicio }: EjercicioCardProps) {

  const handleEditar = () => onEditar(ejercicio.id);
  const handleEliminar = () => onEliminarEjercicio(ejercicio.id);

  return (
    <Card className="group relative bg-slate-900/80 border border-slate-200 hover:border-sky-500/50 transition-all duration-300 p-5 rounded-2xl shadow-lg backdrop-blur-sm flex flex-col justify-between mt-10">
      <div>

        <div className="flex items-center justify-between gap-2 mb-4">
          <h2 className="text-lg font-bold text-gray-500 group-hover:text-sky-400 transition-colors">
            {ejercicio.exercise?.nombre}
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-slate-100 border border-slate-300 mb-4 text-center group-hover:border-sky-400">
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-700">Series</span>
            <span className="text-sm font-bold text-sky-500">{ejercicio.series}</span>
          </div>

          <div className="flex flex-col items-center border-x border-slate-400">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-700">Reps</span>
            <span className="text-sm font-bold text-sky-500">{ejercicio.repeticiones}</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-700">Peso</span>
            <span className="text-sm font-bold text-sky-500">{ejercicio.pesoSugerido} kg</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end pt-3 border-t border-slate-300 gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleEditar}
        >
          Editar
        </Button>

        <Button
          variant="danger-ghost"
          size="sm"
          onClick={handleEliminar}
        >
          Eliminar
        </Button>
      </div>
    </Card>
  );
}