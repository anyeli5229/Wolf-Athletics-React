import type { Ejercicio } from "../types/ejercicio";
import request from "./http";

export function obtenerEjercicios() {
    return request<Ejercicio[]>("/ejercicios");
}