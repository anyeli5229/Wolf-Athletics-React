import { useEffect, useState } from "react";
import type { Rutina } from "../types/rutina";
import type { EjercicioFormulario, RutinaFormulario } from "../types/formulario";
import type { Ejercicio } from "../types/ejercicio";

export type UseRutinasType = {
  rutinas: Rutina[];
  rutinaEditar: Rutina | null;
  crearRutina: (rutinaNueva: RutinaFormulario) => void;
  actualizarRutina: (id: string, datosActualizados: RutinaFormulario) => void;
  eliminarRutina: (id: string) => void;
  seleccionarRutinaEditar: (id: string) => void;
  cancelarEdicion: () => void;
  ejercicioEditar: Ejercicio | null;
  agregarEjercicio: (rutinaId: string, ejercicioNuevo: EjercicioFormulario) => void;
  seleccionarEjercicioEditar: (rutinaId:string, ejercicioId: string) => void;
  cancelarEdicionEjercicio: () => void;
  actualizarEjercicio: (rutinaId: string, ejercicioId: string, datosActualizados: EjercicioFormulario) => void;
  eliminarEjercicio: (rutinaId: string, ejercicioId: string) => void;
}

export function useRutinas() : UseRutinasType {

  //Const
  const STORAGE_KEY = "rutinas";

  // State

  const [rutinas, setRutinas] = useState<Rutina[]>(() => {
    const rutinasGuardadas = localStorage.getItem(STORAGE_KEY);
    return rutinasGuardadas ? JSON.parse(rutinasGuardadas) : [];
  });

  const [rutinaEditar, setRutinaEditar] = useState<Rutina | null>(null);

  const [ejercicioEditar, setEjercicioEditar] = useState<Ejercicio | null>(null);

  // Effects

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rutinas));
  }, [rutinas]);


  // Actions
  // CRUD

  const crearRutina = (rutinaNueva: RutinaFormulario) => {
    const rutina = {
      id: crypto.randomUUID(),
      ...rutinaNueva,
      ejercicios: [],
    };
    setRutinas(anteriores => [...anteriores, rutina]);
  }

  const actualizarRutina = (id: string, datosActualizados: RutinaFormulario) => {
    setRutinas((anteriores) =>
      anteriores.map((rutina) =>
        rutina.id === id ? { ...rutina, ...datosActualizados } : rutina
      )
    );
  }

  const eliminarRutina = (id: string) => {
    setRutinas((prev) => prev.filter((rutina) => rutina.id !== id));
  }

  // Edition

  const seleccionarRutinaEditar = (id: string) => {
    const rutinaEncontrada = rutinas.find(rutina => rutina.id === id);
    if (rutinaEncontrada) {
      setRutinaEditar(rutinaEncontrada);
    }
  }

  const cancelarEdicion = () => {
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
    if(!rutina) return;
    const ejercicio = rutina.ejercicios.find(ejercicio => ejercicio.id === ejercicioId);
    if(ejercicio) {
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