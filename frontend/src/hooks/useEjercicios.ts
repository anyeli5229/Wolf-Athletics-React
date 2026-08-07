import { useEffect, useState } from "react"
import type { Ejercicio } from "../types/ejercicio"
import { obtenerEjercicios } from "../services/ejerciciosApi";
import type { EjercicioFormulario } from "../types/formulario";
import { crearEjercicio as crearEjercicioApi, actualizarEjercicio as actualizarEjercicioApi, eliminarEjercicio as eliminarEjercicioApi } from "../services/ejerciciosApi";

export function useEjercicios() {

    //states
    const [ejercicios, setEjercicios] = useState<Ejercicio[]>([]);
    const [ejercicioEditar, setEjercicioEditar] = useState<Ejercicio | null>(null);
    const [errorEjercicio, setErrorEjercicio] = useState('');

    async function cargarEjercicios() {
        try {
            const ejercicios = await obtenerEjercicios();
            setEjercicios(ejercicios);
        } catch (error) {
            if (error instanceof Error) {
                setErrorEjercicio(error.message);
            }
        }
    }

    //useEffect
    useEffect(() => {
        cargarEjercicios();
    }, [])


    async function crearEjercicio(datos: EjercicioFormulario) : Promise<boolean> {
        try {
            const ejercicioCreado = await crearEjercicioApi(datos);
            setEjercicios(anteriores => [
                ...anteriores,
                ejercicioCreado
            ]);
            setErrorEjercicio("");
            return true;
        } catch (error) {
            if (error instanceof Error) {
                setErrorEjercicio(error.message);
            }
            return false;
        }
    }

    async function actualizarEjercicio(ejercicioId: string, datos: EjercicioFormulario) : Promise<boolean> {
        try {
            const ejercicioActualizado = await actualizarEjercicioApi(ejercicioId, datos);
            setEjercicios(anteriores => anteriores.map(ejercicio => ejercicio.id === ejercicioId ? ejercicioActualizado : ejercicio));
            setErrorEjercicio("");
            return true;
        } catch (error) {
            if (error instanceof Error) {
                setErrorEjercicio(error.message);
            }
            return false;
        }
    }

    async function eliminarEjercicio(ejercicioId: string) : Promise<boolean> {
        try {
            await eliminarEjercicioApi(ejercicioId);
            setEjercicios(anteriores => anteriores.filter(ejercicio => ejercicio.id !== ejercicioId))
            setErrorEjercicio("");
            return true;
        } catch (error) {
            if (error instanceof Error) {
                setErrorEjercicio(error.message);
            }
            return false;
        }
    }

    function seleccionarEjercicioEditar(ejercicioId: string) {
        const ejercicio = ejercicios.find(ejercicio => ejercicio.id === ejercicioId);
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
        ejercicios,
        ejercicioEditar,
        errorEjercicio,

        crearEjercicio,
        actualizarEjercicio,
        eliminarEjercicio,

        seleccionarEjercicioEditar,
        cancelarEdicionEjercicio,
        limpiarErrorEjercicio
    }
}