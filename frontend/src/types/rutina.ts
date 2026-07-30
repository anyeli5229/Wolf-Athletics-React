import type { Ejercicio } from "./ejercicio";

export type Rutina = {
  id: string;
  nombre: string;
  intensidad: string;
  duracion: number | string;
  ejercicios: Ejercicio[];
};