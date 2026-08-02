import prisma from "../config/prisma";

export async function obtenerUsuarioDemo() {
    return await prisma.user.findUnique({
        where: {
            email: "demo@wolfathletics.com"
        }
    });
}