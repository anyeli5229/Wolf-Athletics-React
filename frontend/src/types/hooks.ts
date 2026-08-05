import type { RutinaFormulario } from "./formulario";
import type { Rutina } from "./rutina";

export type UseRutinasType = {
  rutinas: Rutina[];
  rutinaEditar: Rutina | null;
  crearRutina: (rutinaNueva: RutinaFormulario) => Promise<void>;
  actualizarRutina: (id: string, datosActualizados: RutinaFormulario) => Promise<void>;
  eliminarRutina: (id: string) => Promise<void>;
  seleccionarRutinaEditar: (id: string) => void;
  cancelarEdicion: () => void;
}

export type UseModalType = {
    isOpen: boolean;
    abrir: () => void;
    cerrar: () => void;
}