import { Navigate, useNavigate, useParams } from "react-router-dom";
import DetalleRutina from "../components/DetalleRutina";
import { useRutinasContext } from "../hooks/useRutinasContext";
import type { Rutina } from "../types/rutina";
import { useRutinaEjercicios } from "../hooks/useRutinaEjercicios";

export function RutinaPage() {

    const { id } = useParams<{ id: string }>();

    const ejerciciosRutina = useRutinaEjercicios(id!);


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
                {...ejerciciosRutina}
                onVolver={volver}
            />
        </div>
    )
}