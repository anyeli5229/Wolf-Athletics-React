import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    const existeDemo = await prisma.user.findUnique({
        where: {
            email: "demo@wolfathletics.com"
        },
    });

    if (existeDemo) {
        console.log("✅ El usuario demo ya existe");
        return;
    }

    const password = await bcrypt.hash("1234", 10);
    const usuario = await prisma.user.create({
        data: {
            nombre: "Usuario Demo",
            email: "demo@wolfathletics.com",
            password
        }
    })

    console.log("Usuario creado");
    console.log(usuario);
}

main().catch(console.error).finally(async () => {
    await prisma.$disconnect();
})