import { Link } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "../../hooks/useAuth";


type HeaderProps = {
  onAccionPrincipal?: () => void;
  mostrarBotonPrincipal?: boolean;
  textoBotonPrincipal?: string;
  linkNavegacion?: {
    texto: string;
    to: string;
  }
}

export default function Header({ onAccionPrincipal, mostrarBotonPrincipal = true, textoBotonPrincipal = "+ Nueva Rutina", linkNavegacion }: HeaderProps) {
  const { usuario, cerrarSesion } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full bg-white backdrop-blur-md border-b border-slate-300 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(56,189,248,0.15)] group-hover:border-sky-500/60 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all duration-300">
            🐺
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600">
              WOLF ATHLETICS
            </h1>
            <p className="text-[10px] uppercase font-semibold tracking-widest text-slate-500">
              Training System
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {linkNavegacion && (
            <Link to={linkNavegacion.to}>
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                {linkNavegacion.texto}
              </Button>
            </Link>
          )}

          {mostrarBotonPrincipal && onAccionPrincipal && (
            <Button
              variant="primary"
              size="sm"
              onClick={onAccionPrincipal}
              className="shadow-md hover:shadow-sky-500/10"
            >
              {textoBotonPrincipal}
            </Button>
          )}

          {usuario && (
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-700 truncate max-w-30">
                  {usuario.nombre}
                </p>
                <p className="text-[10px] text-slate-400">Atleta</p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={cerrarSesion}
                className="text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-200"
                title="Cerrar Sesión"
              >
                Cerrar Sesíon
              </Button>
            </div>
          )}
        </div>

      </div>
    </header>
  )
}