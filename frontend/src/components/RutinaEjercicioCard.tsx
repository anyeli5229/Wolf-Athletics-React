import type { RutinaEjercicio } from "../types/rutinaEjercicio";
import Button from "./ui/Button";
import Card from "./ui/Card";

type RutinaEjercicioCardProps = {
  ejercicio: RutinaEjercicio;
  onEditar: (id: string) => void;
  onEliminar: (id: string) => void;
};

export default function RutinaEjercicioCard({ ejercicio, onEditar, onEliminar }: RutinaEjercicioCardProps) {
  return (
    <Card className="group relative bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all duration-200 p-5 rounded-2xl shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <h2 className="text-base font-bold text-slate-800 tracking-tight leading-snug group-hover:text-sky-600 transition-colors">
            {ejercicio.exercise?.nombre || "Ejercicio sin nombre"}
          </h2>

          {ejercicio.exercise?.grupoMuscular && (
            <span className="shrink-0 px-2.5 py-1 text-[11px] font-medium text-sky-700 bg-sky-50 border border-sky-100 rounded-lg">
              {ejercicio.exercise.grupoMuscular}
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200/80 mb-3 text-center">
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Series</span>
            <span className="text-sm font-bold text-slate-700">{ejercicio.series}</span>
          </div>

          <div className="flex flex-col items-center border-x border-slate-200">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Reps</span>
            <span className="text-sm font-bold text-slate-700">{ejercicio.repeticiones}</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Peso</span>
            <span className="text-sm font-bold text-sky-600">{ejercicio.pesoSugerido ?? 0} kg</span>
          </div>
        </div>

        <div className="flex items-center justify-around text-xs text-slate-500 font-medium mb-2 px-1">
          {ejercicio.descanso !== undefined && (
            <span className="flex items-center gap-1 text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              {ejercicio.descanso}s descanso
            </span>
          )}

          {ejercicio.rir !== undefined && (
            <span className="text-slate-400">
              RIR: <strong className="text-slate-600 font-semibold">{ejercicio.rir}</strong>
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end pt-3 border-t border-slate-100 gap-1 mt-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEditar(ejercicio.id)}
          className="text-slate-500 hover:text-slate-800 text-xs font-medium"
        >
          Editar
        </Button>

        <Button
          variant="danger-ghost"
          size="sm"
          onClick={() => onEliminar(ejercicio.id)}
          className="text-xs font-medium"
        >
          Eliminar
        </Button>
      </div>
    </Card>
  )
}