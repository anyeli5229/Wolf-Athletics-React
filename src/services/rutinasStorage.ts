import type { Rutina } from "../types/rutina";


 const STORAGE_KEY = "rutinas";

 export function cargarRutinas(): Rutina[] {
    const rutinasGuardadas = localStorage.getItem(STORAGE_KEY);
    return rutinasGuardadas ? JSON.parse(rutinasGuardadas) : [];
 }

 export function guardarRutinas(rutinas: Rutina[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rutinas));
 }