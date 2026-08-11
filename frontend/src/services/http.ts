import { obtenerToken } from "./token";

const API_URL = "http://localhost:3000/api";

async function request<T>( endpoint: string, options?: RequestInit ): Promise<T> {
    const token = obtenerToken();

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options?.headers as Record<string, string> ?? {})
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const respuesta = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers
    });

    if (!respuesta.ok) {
        const error = await respuesta.json();

        throw new Error(error.mensaje || `Error ${respuesta.status}`);
    }

    return respuesta.json();
}

export default request;