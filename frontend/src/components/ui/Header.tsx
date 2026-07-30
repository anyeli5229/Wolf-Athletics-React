import Button from "./Button";

type HeaderProps = {
  onCrearRutina?: () => void;
  mostrarBotonCrear?: boolean;
};

export default function Header({ onCrearRutina, mostrarBotonCrear = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white backdrop-blur-md border-b border-slate-300 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        <div className="flex items-center gap-3 group cursor-pointer">

          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(56,189,248,0.15)] group-hover:border-sky-500/60 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all duration-300">
            🐺
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-sky-200 via-sky-300 to-sky-500">
              WOLF ATHLETICS
            </h1>
            <p className="text-[10px] uppercase font-semibold tracking-widest text-slate-500">
              Training System
            </p>
          </div>
        </div>


        {/* <span>{totalRutinas} {totalRutinas === 1 ? "rutina" : "rutinas"}</span> */}

        <div className="flex items-center gap-4">
          {/*  (Solo se muestra cuando no estamos en detalle) */}
          {mostrarBotonCrear && onCrearRutina && (
            <Button 
              variant="primary" 
              onClick={onCrearRutina}
              className="shadow-md hover:shadow-sky-500/10"
            >
              + Nueva Rutina
            </Button>
          )}
        </div>

      </div>
    </header>
  );
}