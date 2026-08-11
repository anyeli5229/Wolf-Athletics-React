import bcrypt  from "bcrypt"
import { LoginInput, RegisterInput } from "../schemas/auth/auth.schema";
import prisma from "../config/prisma";

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
    console.log("--> Body recibido en login service:", datos);

    const usuarioExiste = await buscarUsuario(datos.email);
    if (!usuarioExiste) {
        console.log("❌ FALLO: El correo no existe en la BD:", datos.email);
        return null;
    }

    const passwordCorrecta = await verificarPassword(datos.password, usuarioExiste.password);
    if (!passwordCorrecta) {
        console.log("❌ FALLO: La contraseña no coincide con el hash almacenado");
        return null;
    }

    console.log("✅ ÉXITO: Usuario autenticado correctamente");
    return usuarioExiste;
}