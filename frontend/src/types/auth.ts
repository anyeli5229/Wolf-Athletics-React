export type Usuario = {
    id: string;
    nombre: string;
    email: string;
    createdAt?: string;
    updatedAt?: string;
}

export type RegistroResponse = {
    mensaje: string;
    usuario: Usuario;
}

export type RegisterInput = Pick<Usuario, "nombre" | "email"> & {
    password: string;
}

export type LoginResponse = {
    mensaje: string;
    usuario: Usuario;
    token: string;
}

export type LoginInput = Pick<Usuario, "email"> & {
    password: string;
}

export type MeResponse = {
    usuario: UsuarioAutenticado;
}

export type UsuarioAutenticado = {
    id: string;
    nombre: string;
    email: string;
}