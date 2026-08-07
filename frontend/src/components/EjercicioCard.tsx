import type { Ejercicio } from "../types/ejercicio";
import Button from "./ui/Button";
import Card from "./ui/Card";

type EjercicioCardProps = {
  ejercicio: Ejercicio;
  onEditar: (id: string) => void;
  onEliminar: (id: string) => void;  
}

export default function EjercicioCard({ ejercicio, onEditar, onEliminar }: EjercicioCardProps) {
  return (
    <Card className="group relative bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all duration-200 p-5 rounded-2xl shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <h2 className="text-base font-bold text-slate-800 tracking-tight leading-snug group-hover:text-sky-600 transition-colors">
            {ejercicio.nombre}
          </h2>

          {ejercicio.grupoMuscular && (
            <span className="shrink-0 px-2.5 py-1 text-[11px] font-medium text-sky-700 bg-sky-50 border border-sky-100 rounded-lg">
              {ejercicio.grupoMuscular}
            </span>
          )}
        </div>

        {ejercicio.descripcion && (
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mt-2">
            {ejercicio.descripcion}
          </p>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        {ejercicio.equipo ? (
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l5.654-4.654m0 0a3.2 3.2 0 0 1-.766-1.208l-3.03-2.496m0 0L2.1 2.1a2.652 2.652 0 0 0 0 3.75l5.877 5.877" />
            </svg>
            <span>{ejercicio.equipo}</span>
          </div>
        ) : <span />}

        <div className="flex items-center gap-1">
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
      </div>
    </Card>
  )
}