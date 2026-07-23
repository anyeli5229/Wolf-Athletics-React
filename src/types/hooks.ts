import type { Ejercicio } from "./ejercicio";
import type { EjercicioFormulario, RutinaFormulario } from "./formulario";
import type { Rutina } from "./rutina";

export type UseRutinasType = {
  rutinas: Rutina[];
  rutinaEditar: Rutina | null;
  crearRutina: (rutinaNueva: RutinaFormulario) => void;
  actualizarRutina: (id: string, datosActualizados: RutinaFormulario) => void;
  eliminarRutina: (id: string) => void;
  seleccionarRutinaEditar: (id: string) => void;
  cancelarEdicion: () => void;
  ejercicioEditar: Ejercicio | null;
  agregarEjercicio: (rutinaId: string, ejercicioNuevo: EjercicioFormulario) => void;
  seleccionarEjercicioEditar: (rutinaId:string, ejercicioId: string) => void;
  cancelarEdicionEjercicio: () => void;
  actualizarEjercicio: (rutinaId: string, ejercicioId: string, datosActualizados: EjercicioFormulario) => void;
  eliminarEjercicio: (rutinaId: string, ejercicioId: string) => void;
}

export type UseModalType = {
    isOpen: boolean;
    abrir: () => void;
    cerrar: () => void;
}