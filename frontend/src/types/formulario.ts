import type { Ejercicio } from "./ejercicio";
import type { Rutina } from "./rutina";
import type { RutinaEjercicio } from "./rutinaEjercicio";


export type RutinaFormulario = Pick<Rutina, "nombre" | "nivel" | "duracion">;
export type EjercicioFormulario = Pick<Ejercicio, "nombre" | "descripcion" | "grupoMuscular" | "equipo">;
export type EjercicioEnRutinaFormulario = Pick<RutinaEjercicio, "exerciseId" | "series" | "repeticiones" | "pesoSugerido" | "descanso" | "rir" | "notas">;