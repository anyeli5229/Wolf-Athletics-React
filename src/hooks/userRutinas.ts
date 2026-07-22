import { useEffect, useState } from "react";
import type { Rutina } from "../types/rutina";
import type { EjercicioFormulario, RutinaFormulario } from "../types/formulario";
import type { Ejercicio } from "../types/ejercicio";

export function useRutinas() {

    //Const
    const STORAGE_KEY = "rutinas";

    // State

    const [rutinas, setRutinas] = useState<Rutina[]>(() => {
        const rutinasGuardadas = localStorage.getItem(STORAGE_KEY);
        return rutinasGuardadas ? JSON.parse(rutinasGuardadas) : [];
    });

    const [rutinaSeleccionadaId, setRutinaSeleccionadaId] = useState<string | null>(null);

    const [rutinaEditar, setRutinaEditar] = useState<Rutina | null>(null);

    const [ejercicioEditar, setEjercicioEditar] = useState<Ejercicio | null>(null);

    // Effects

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(rutinas));
    }, [rutinas]);

    // Derived State

    const rutinaSeleccionada = rutinas.find((rutina) => rutina.id === rutinaSeleccionadaId);//Sirve para poder ver la rutina

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


    // Navigation

    const entrarRutina = (id: string) => {
        setRutinaSeleccionadaId(id);
    }

    const volver = () => {
        setRutinaSeleccionadaId(null);
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

  function obtenerEjercicioEditar(ejercicioId: string) {
    if (rutinaSeleccionada) {
      const ejercicioEncontrado = rutinaSeleccionada.ejercicios.find(
        (e) => e.id === ejercicioId
      );
      if (ejercicioEncontrado) setEjercicioEditar(ejercicioEncontrado);
    }
  }



  function actualizarEjercicio( rutinaId: string, ejercicioId: string, datosActualizados: EjercicioFormulario) {
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
        rutinaSeleccionada,
        rutinaEditar,

        crearRutina,
        actualizarRutina,
        eliminarRutina,

        entrarRutina,
        volver,

        seleccionarRutinaEditar,
        cancelarEdicion,

        ejercicioEditar,
        agregarEjercicio,
        obtenerEjercicioEditar,
        cancelarEdicionEjercicio,
        actualizarEjercicio,
        eliminarEjercicio
    };
}