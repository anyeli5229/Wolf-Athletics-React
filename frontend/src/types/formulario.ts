import type { Ejercicio } from "./ejercicio";
import type { Rutina } from "./rutina";

export type RutinaFormulario = Pick<Rutina, "nombre" | "intensidad" | "duracion">;
export type EjercicioFormulario = Pick<Ejercicio, 'nombre' | 'series' | 'repeticiones' | 'peso'>;