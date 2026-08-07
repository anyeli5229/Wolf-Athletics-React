import z from "zod";

export const registerSchema = z.object({
    nombre: z.string().min(1, "El nombre de usuario es obligatorio"),
    email: z.email("Debes de agregar un email válido"),
    password: z.string().min(6, "La contraseña debe de tener al menos 6 caracteres")
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
    email: z.email("Debes de agregar un email válido"),
    password: z.string().min(1, "La contraseña es obligatoria")
});

export type LoginInput = z.infer<typeof loginSchema>;