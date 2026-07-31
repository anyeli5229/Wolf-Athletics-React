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
        <Card className="group relative bg-slate-900/80 border border-slate-200 hover:border-sky-500/50 transition-all duration-300 p-5 rounded-2xl shadow-lg backdrop-blur-sm flex flex-col justify-between my-10">
            <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                    <h2 className="text-xl font-bold text-gray-500 group-hover:text-sky-400 transition-colors">
                        {rutina.nombre}
                    </h2>
                    
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                        {rutina.nivel}
                    </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-400 mb-6">
                    <div className="flex items-center gap-1.5">
                        {/* Ícono Reloj */}
                        <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{rutina.duracion} min</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        {/* Ícono de Ejercicios */}
                        <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <span>{rutina.ejercicios.length} ejercicios</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-300 gap-2">
                <div className="flex items-center gap-1">
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => onEditar(rutina.id)}
                        className="text-slate-400 hover:text-slate-200"
                    >
                        Editar
                    </Button>
                    
                    <Button 
                        variant="danger-ghost" 
                        size="sm" 
                        onClick={() => onEliminar(rutina.id)}
                    >
                        Eliminar
                    </Button>
                </div>

                <Button 
                    variant="primary" 
                    size="sm" 
                    onClick={() => onEntrar(rutina.id)}
                >
                    Abrir Rutina →
                </Button>
            </div>
        </Card>
    );
}