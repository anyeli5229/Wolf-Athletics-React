import { useEffect, useState } from "react";
import type { RutinaEjercicio } from "../types/rutinaEjercicio";
import type { Ejercicio } from "../types/ejercicio";
import { obtenerEjercicios } from "../services/ejerciciosApi";
import { actualizarEjercicioDeRutina, agregarEjercicioEnRutina, eliminarEjercicioDeRutina, obtenerEjerciciosDeRutina } from "../services/rutinaEjerciciosApi";
import type { EjercicioEnRutinaFormulario } from "../types/formulario";

export function useRutinaEjercicios(routineId: string) {
    //states
    const [ejercicios, setEjercicios] = useState<RutinaEjercicio[]>([]);//Ejercicios que pertenece a una rutina
    const [ejercicioEditar, setEjercicioEditar] = useState<RutinaEjercicio | null>(null);
    const [errorEjercicio, setErrorEjercicio] = useState("");

    const [ejerciciosCatalogo, setEjerciciosCatalogo] = useState<Ejercicio[]>([]);//Ejercicios que se pueden seleccionar

    async function cargarEjercicios() {
        if (!routineId) return;

        const ejercicios = await obtenerEjerciciosDeRutina(routineId);

        setEjercicios(ejercicios);
    }

    // Effects
    useEffect(() => {
        cargarEjercicios();
    }, [routineId]);

    useEffect(() => {
        async function cargarEjerciciosCatalogo() {
            const ejerciciosCatalogo = await obtenerEjercicios(routineId);
            setEjerciciosCatalogo(ejerciciosCatalogo);
        }

        cargarEjerciciosCatalogo();
    }, [])

    // CRUD

    async function crearEjercicio(datos: EjercicioEnRutinaFormulario) {
        try {
            if (!routineId) return false;
            const nuevoEjercicio = await agregarEjercicioEnRutina(routineId, datos);
            setEjercicios(anteriores => [...anteriores, nuevoEjercicio]);
            return true;

        } catch (error) {
            if (error instanceof Error) {
                setErrorEjercicio(error.message);
            }

            return false;
        }
    }

    async function actualizarEjercicio(ejercicioId: string, datos: EjercicioEnRutinaFormulario) {
        try {
            if (!routineId) return;
            const ejercicioActualizado = await actualizarEjercicioDeRutina(routineId, ejercicioId, datos);
            setEjercicios(anteriores => anteriores.map(ejercicio => ejercicio.id === ejercicioId ? ejercicioActualizado : ejercicio))
            setErrorEjercicio("");
        } catch (error) {
            if (error instanceof Error) {
                setErrorEjercicio(error.message);
            }
        }
    }


    async function eliminarEjercicio(ejercicioId: string) {
        try {
            if (!routineId) return;
            await eliminarEjercicioDeRutina(routineId, ejercicioId);
            setEjercicios(anteriores => anteriores.filter(ejercicio => ejercicio.id !== ejercicioId));
            setErrorEjercicio("");
        } catch (error) {
            if (error instanceof Error) {
                setErrorEjercicio(error.message);
            }
        }
    }

    function seleccionarEjercicioEditar(id: string) {
        const ejercicio = ejercicios.find(ejercicio => ejercicio.id === id);
        if (ejercicio) {
            setEjercicioEditar(ejercicio);
        }
    }

    function cancelarEdicionEjercicio() {
        setEjercicioEditar(null);
    }

    function limpiarErrorEjercicio() {
        setErrorEjercicio("");
    }

    return {
        //states
        ejercicios,
        ejerciciosCatalogo,
        ejercicioEditar,
        errorEjercicio,

        //acciones
        crearEjercicio,
        actualizarEjercicio,
        eliminarEjercicio,

        //UI
        seleccionarEjercicioEditar,
        cancelarEdicionEjercicio,
        limpiarErrorEjercicio,
    }
}