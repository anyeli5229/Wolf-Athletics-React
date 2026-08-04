import { Navigate, useNavigate, useParams } from "react-router-dom";
import DetalleRutina from "../components/DetalleRutina";
import { useRutinasContext } from "../hooks/useRutinasContext";
import type { Rutina } from "../types/rutina";
import { useEffect, useState } from "react";
import type { RutinaEjercicio } from "../types/rutinaEjercicio";
import { agregarEjercicioEnRutina, obtenerEjerciciosDeRutina } from "../services/rutinaEjerciciosApi";
import type { EjercicioEnRutinaFormulario } from "../types/formulario";
import type { Ejercicio } from "../types/ejercicio";
import { obtenerEjercicios } from "../services/ejerciciosApi";

export function RutinaPage() {

    const { id } = useParams<{ id: string }>();

    const [ejercicios, setEjercicios] = useState<RutinaEjercicio[]>([]);//Ejercicios que pertenece a una rutina
    const [ejercicioEditar, setEjercicioEditar] = useState<RutinaEjercicio | null>(null);
    const [errorEjercicio, setErrorEjercicio] = useState("");

    const [ejerciciosCatalogo, setEjerciciosCatalogo] = useState<Ejercicio[]>([]);//Ejercicios que se pueden seleccionar

    useEffect(() => {
        if (id) {
            obtenerEjerciciosDeRutina(id).then(setEjercicios);
        }
    }, [id]);

    useEffect(() => {
        async function cargarEjerciciosParaSeleccionar() {
            const ejerciciosCatalogo = await obtenerEjercicios();
            setEjerciciosCatalogo(ejerciciosCatalogo);
        }

        cargarEjerciciosParaSeleccionar();
    }, [])


    async function crearEjercicio(datos: EjercicioEnRutinaFormulario) {
        try {
            if (!id) return false;
            const nuevoEjercicio = await agregarEjercicioEnRutina(id, datos);
            setEjercicios(anteriores => [...anteriores, nuevoEjercicio]);
            return true;

        } catch (error) {
            if (error instanceof Error) {
                setErrorEjercicio(error.message);
            }

            return false;
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


    const rutinas = useRutinasContext();
    const rutina = rutinas.rutinas.find((rutina: Rutina) => rutina.id === id);

    const navigate = useNavigate();

    function volver() {
        navigate("/");
    }

    if (!rutina) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="max-w-7xl mx-auto px-6">
            <DetalleRutina
                rutina={rutina}
                ejercicios={ejercicios}
                ejerciciosCatalogo={ejerciciosCatalogo}
                errorEjercicio={errorEjercicio}
                limpiarErrorEjercicio={limpiarErrorEjercicio}
                onEditar={seleccionarEjercicioEditar}
                onCrearEjercicio={crearEjercicio}
                ejercicioEditar={ejercicioEditar}
                onActualizaEjercicio={rutinas.actualizarEjercicio}
                cancelarEdicionEjercicio={cancelarEdicionEjercicio}
                onEliminarEjercicio={rutinas.eliminarEjercicio}
                onVolver={volver}
            />
        </div>
    )
}