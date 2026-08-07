import type { Rutina } from "../types/rutina";
import Button from "./ui/Button";
import Card from "./ui/Card";

type RutinaCardProps = {
    rutina: Rutina;
    onEntrar: (id: string) => void;
    onEditar: (id: string) => void;
    onEliminar: (id: string) => void;
}

export default function RutinaCard({ rutina, onEntrar, onEditar, onEliminar }: RutinaCardProps) {
    return (
        <Card className="group relative bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all duration-200 p-5 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>

                <div className="flex items-start justify-between gap-3 mb-2">
                    <h2 className="text-base font-bold text-slate-800 tracking-tight leading-snug group-hover:text-sky-600 transition-colors">
                        {rutina.nombre}
                    </h2>
                    
                    <span className="shrink-0 px-2.5 py-1 text-[11px] font-medium text-sky-700 bg-sky-50 border border-sky-100 rounded-lg">
                        {rutina.nivel}
                    </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 font-medium my-4">
                    <div className="flex items-center gap-1.5">
                        <svg className="size-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{rutina.duracion} min</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <svg className="size-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <span>{rutina.ejercicios?.length || 0} ejercicios</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 gap-2 mt-2">
                <div className="flex items-center gap-1">
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => onEditar(rutina.id)}
                        className="text-slate-500 hover:text-slate-800 text-xs font-medium"
                    >
                        Editar
                    </Button>
                    
                    <Button 
                        variant="danger-ghost" 
                        size="sm" 
                        onClick={() => onEliminar(rutina.id)}
                        className="text-xs font-semibold"
                    >
                        Eliminar
                    </Button>
                </div>

                <Button 
                    variant="primary" 
                    size="sm" 
                    onClick={() => onEntrar(rutina.id)}
                    className="text-xs font-semibold"
                >
                    Abrir Rutina →
                </Button>
            </div>
        </Card>
    );
}