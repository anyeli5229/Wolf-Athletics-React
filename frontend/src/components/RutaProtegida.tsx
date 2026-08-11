import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { RutinasProvider } from "../context/RutinaContext";

export function RutaProtegida() {
    const { usuario, cargando } = useAuth();

    if (cargando) {
        return <div>Cargando sesión...</div>;
    }

    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    return (
        <RutinasProvider>
            <Outlet />
        </RutinasProvider>
    )
}