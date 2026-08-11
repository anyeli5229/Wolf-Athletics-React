import type { LoginInput, LoginResponse, MeResponse, RegisterInput, RegistroResponse } from "../types/auth";
import request from "./http";
import { guardarToken } from "./token";

export function registro(datos: RegisterInput) {
    return request<RegistroResponse>("/auth/register", {
        method: "POST",
        body: JSON.stringify(datos)
    });
}

export async function login(datos: LoginInput) {
    const respuesta = await request<LoginResponse>("/auth/login" , {
        method: "POST",
        body: JSON.stringify(datos)
    });

    guardarToken(respuesta.token);
    return respuesta;
}

export function me() {
    return request<MeResponse>("/auth/me");
}