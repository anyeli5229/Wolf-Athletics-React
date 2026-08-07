import bcrypt  from "bcrypt"
import { LoginInput, RegisterInput } from "../schemas/auth/auth.schema";
import prisma from "../config/prisma";
import { NotFoundError } from "../errors/NotFoundError";

async function hashPassword(password:string) {
    const salts = 10;
    return await bcrypt.hash(password,salts);
}

async function verificarPassword(password: string, hashPassword: string) {
    return await bcrypt.compare(password, hashPassword);
}

async function buscarUsuario(email: string) {
    return await prisma.user.findUnique({
        where: { email }
    });
}

export async function register(datos: RegisterInput) {
    const usuarioExiste = await buscarUsuario(datos.email);
    if(usuarioExiste) return null;

    const hashedPassword = await hashPassword(datos.password);

    return await prisma.user.create({
        data: {
            ...datos,
            password: hashedPassword
        }
    });
}

export async function login(datos: LoginInput) {
    const usuarioExiste = await buscarUsuario(datos.email);
    if(!usuarioExiste) return null;

    const passwordCorrecta = await verificarPassword(datos.password, usuarioExiste.password);
    if(!passwordCorrecta) return null;

    return usuarioExiste;
}