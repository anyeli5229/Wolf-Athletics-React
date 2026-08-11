import { useEffect, useState } from "react";
import type { Rutina } from "../types/rutina";
import type { UseRutinasType } from "../types/hooks";
import { obtenerRutinas, crearRutina as crearRutinaApi, actualizarRutina as actualizarRutinaApi, eliminarRutina as eliminarRutinaApi } from "../services/rutinasApi";
import type { RutinaFormulario } from "../types/formulario";
import { obtenerToken } from "../services/token";


export function useRutinas(): UseRutinasType {

  // State

  const [rutinas, setRutinas] = useState<Rutina[]>([]);
  const [rutinaEditar, setRutinaEditar] = useState<Rutina | null>(null);


  //Helpers 
  function buscarRutina(id: string) {
    return rutinas.find(rutina => rutina.id === id);
  }


  // Effects
  useEffect(() => {
    const token = obtenerToken();
    
    if (!token) return;// Si no hay token, no hacer fetch a la API protegida

    async function cargar() {
      const rutinas = await obtenerRutinas();
      setRutinas(rutinas);
    }

    cargar();
  }, [])


  // Actions
  // CRUD

  async function crearRutina(rutinaNueva: RutinaFormulario): Promise<void> {
    const rutinaCreada = await crearRutinaApi(rutinaNueva);
    setRutinas(anteriores => [...anteriores, rutinaCreada]);
  }

  async function actualizarRutina(id: string, datosActualizados: RutinaFormulario): Promise<void> {
    const rutinaActualizada = await actualizarRutinaApi(id, datosActualizados);

    setRutinas((anteriores) =>
      anteriores.map((rutina) =>
        rutina.id === id ? rutinaActualizada : rutina
      )
    );
  }

  async function eliminarRutina(id: string): Promise<void> {
    const rutinaEliminada = await eliminarRutinaApi(id);
    setRutinas((prev) => prev.filter((rutina) => rutina.id !== rutinaEliminada.id));
  }

  // Edition

  function seleccionarRutinaEditar(id: string) {
    const rutinaEncontrada = buscarRutina(id);
    if (rutinaEncontrada) {
      setRutinaEditar(rutinaEncontrada);
    }
  }

  function cancelarEdicion() {
    setRutinaEditar(null);
  }

  return {
    rutinas,
    rutinaEditar,

    crearRutina,
    actualizarRutina,
    eliminarRutina,

    seleccionarRutinaEditar,
    cancelarEdicion,

  };
}