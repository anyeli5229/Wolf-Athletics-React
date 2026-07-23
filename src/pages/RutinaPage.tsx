import { Navigate, useNavigate, useParams } from "react-router-dom";
import DetalleRutina from "../components/DetalleRutina";
import type { UseRutinasType } from "../hooks/useRutinas";

type RutinaPageProps = {
    rutinas: UseRutinasType
}

export function RutinaPage({ rutinas }: RutinaPageProps) {

    const { id } = useParams();
    const rutina = rutinas.rutinas.find(rutina => rutina.id === id);

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
                onEditar={rutinas.seleccionarEjercicioEditar}
                onCrearEjercicio={rutinas.agregarEjercicio}
                ejercicioEditar={rutinas.ejercicioEditar}
                onActualizaEjercicio={rutinas.actualizarEjercicio}
                cancelarEdicionEjercicio={rutinas.cancelarEdicionEjercicio}
                onEliminarEjercicio={rutinas.eliminarEjercicio}
                onVolver={volver}
            />
        </div>
    )
}