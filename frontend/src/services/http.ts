const API_URL = "http://localhost:3000/api";

async function request<T>(endpoint: string, options?: RequestInit) : Promise<T> {
    const respuesta = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...(options?.headers ?? {})
        },
        ...options
    });

    if(!respuesta.ok) {
        throw new Error(`Error ${respuesta.status}`);
    }

    return respuesta.json();
}

export default request;