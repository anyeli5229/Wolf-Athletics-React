import type { Rutina } from "./rutina";

export type RutinaFormulario = Pick<Rutina, "nombre" | "intensidad" | "duracion">;