import  jwt from "jsonwebtoken";

export type JwtType = {
    id: string;
    email: string;
}

export function generarJWT(data: JwtType) {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET no está definido en las variables de entorno");
    }

    return jwt.sign(data, secret, {
        expiresIn: "7d",
    });
}

export function verificarJWT(token: string): JwtType {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET no está definido en el entorno");
  }

  return jwt.verify(token, secret) as JwtType;
}