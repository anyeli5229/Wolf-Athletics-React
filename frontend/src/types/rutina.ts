import type { RutinaEjercicio } from "./rutinaEjercicio";

export type Rutina = {
  id: string;
  nombre: string;
  descripcion?: string;
  nivel?: string;
  duracion?: number;
  userId: string;
  ejercicios?: RutinaEjercicio[];
  createdAt: string;
  updatedAt: string;
};