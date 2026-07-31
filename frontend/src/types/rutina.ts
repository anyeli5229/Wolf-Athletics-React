import type { Ejercicio } from "./ejercicio";

export type Rutina = {
  id: string;
  nombre: string;
  descripcion? : string;
  nivel: string;
  duracion: number | string;
  ejercicios: Ejercicio[];
};