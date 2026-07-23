import { useEffect, useState } from "react";
import type { Rutina } from "../types/rutina";
import type { EjercicioFormulario, RutinaFormulario } from "../types/formulario";
import type { Ejercicio } from "../types/ejercicio";
import type { UseRutinasType } from "../types/hooks";
import { cargarRutinas, guardarRutinas } from "../services/rutinasStorage";


export function useRutinas(): UseRutinasType {

  // State

  const [rutinas, setRutinas] = useState<Rutina[]>(cargarRutinas);

  const [rutinaEditar, setRutinaEditar] = useState<Rutina | null>(null);

  const [ejercicioEditar, setEjercicioEditar] = useState<Ejercicio | null>(null);


  //Helpers 
  function buscarRutina(id: string) {
    return rutinas.find(rutina => rutina.id === id);
  }

  function buscarEjercicio(rutina: Rutina, ejercicioId: string) {
    return rutina.ejercicios.find(ejercicio => ejercicio.id === ejercicioId);
  }

  // Effects

  useEffect(() => {
    guardarRutinas(rutinas);
  }, [rutinas]);


  // Actions
  // CRUD

  function crearRutina(rutinaNueva: RutinaFormulario) {
    const rutina = {
      id: crypto.randomUUID(),
      ...rutinaNueva,
      ejercicios: [],
    };
    setRutinas(anteriores => [...anteriores, rutina]);
  }

  function actualizarRutina(id: string, datosActualizados: RutinaFormulario) {
    setRutinas((anteriores) =>
      anteriores.map((rutina) =>
        rutina.id === id ? { ...rutina, ...datosActualizados } : rutina
      )
    );
  }

  function eliminarRutina(id: string) {
    setRutinas((prev) => prev.filter((rutina) => rutina.id !== id));
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

  function agregarEjercicio(rutinaId: string, ejercicioNuevo: EjercicioFormulario) {
    const ejercicio = { id: crypto.randomUUID(), ...ejercicioNuevo };
    setRutinas((anteriores) =>
      anteriores.map((rutina) =>
        rutina.id === rutinaId
          ? { ...rutina, ejercicios: [...rutina.ejercicios, ejercicio] }
          : rutina
      )
    );
  }


  function seleccionarEjercicioEditar(rutinaId: string, ejercicioId: string) {
    const rutina = rutinas.find(rutina => rutina.id === rutinaId);
    if (!rutina) return;
    const ejercicio = buscarEjercicio(rutina, ejercicioId);
    if (ejercicio) {
      setEjercicioEditar(ejercicio);
    }
  }



  function actualizarEjercicio(rutinaId: string, ejercicioId: string, datosActualizados: EjercicioFormulario) {
    setRutinas((anteriores) =>
      anteriores.map((rutina) =>
        rutina.id === rutinaId
          ? {
            ...rutina,
            ejercicios: rutina.ejercicios.map((e) =>
              e.id === ejercicioId ? { ...e, ...datosActualizados } : e
            ),
          }
          : rutina
      )
    );
  }

  function eliminarEjercicio(rutinaId: string, ejercicioId: string) {
    setRutinas((anteriores) =>
      anteriores.map((rutina) =>
        rutina.id === rutinaId
          ? {
            ...rutina,
            ejercicios: rutina.ejercicios.filter((e) => e.id !== ejercicioId),
          }
          : rutina
      )
    );
  }

  function cancelarEdicionEjercicio() {
    setEjercicioEditar(null);
  }


  // Return
  return {
    rutinas,
    rutinaEditar,

    crearRutina,
    actualizarRutina,
    eliminarRutina,

    seleccionarRutinaEditar,
    cancelarEdicion,

    ejercicioEditar,
    agregarEjercicio,
    seleccionarEjercicioEditar,
    cancelarEdicionEjercicio,
    actualizarEjercicio,
    eliminarEjercicio
  };
}