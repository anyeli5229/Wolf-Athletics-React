import { createContext, useEffect, useState, type ReactNode } from "react";
import type { UsuarioAutenticado } from "../types/auth";
import { eliminarToken, obtenerToken } from "../services/token";
import { me } from "../services/authApi";

type AuthContextType = {
    usuario: UsuarioAutenticado | null;
    cargando: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [usuario, setUsuario] = useState<UsuarioAutenticado | null>(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        async function validarToken() {
            const token = obtenerToken();

            if(!token) {
                setUsuario(null);
                setCargando(false);
                return;
            }

            try {
                const respuesta = await me();
                setUsuario(respuesta.usuario)
            } catch (error) {
                console.log(error);
                setUsuario(null);
                eliminarToken();
            } finally {
                setCargando(false);
            }
        }

        validarToken();
    }, []);

    return (
        <AuthContext.Provider value={ {usuario, cargando} }>
            {children}
        </AuthContext.Provider>
    )
}