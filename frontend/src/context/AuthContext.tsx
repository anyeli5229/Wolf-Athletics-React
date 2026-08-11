import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Usuario, UsuarioAutenticado } from "../types/auth";
import { eliminarToken, guardarToken, obtenerToken } from "../services/token";
import { me } from "../services/authApi";

type AuthContextType = {
    usuario: UsuarioAutenticado | null;
    cargando: boolean;
    iniciarSesion: (token: string, usuario: Usuario) => void;
    cerrarSesion: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [usuario, setUsuario] = useState<UsuarioAutenticado | null>(null);
    const [cargando, setCargando] = useState(true);

    function iniciarSesion(token: string, usuario: Usuario) {
        guardarToken(token);
        setUsuario(usuario);
    }

    function cerrarSesion() {
        eliminarToken();
        setUsuario(null);
    }

    useEffect(() => {
        async function validarToken() {
            const token = obtenerToken();

            if (!token) {
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
        <AuthContext.Provider value={{ usuario, cargando, iniciarSesion, cerrarSesion }}>
            {children}
        </AuthContext.Provider>
    )
}