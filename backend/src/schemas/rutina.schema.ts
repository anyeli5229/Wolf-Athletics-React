import z from "zod";

export const rutinaSchema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    intensidad: z.string().min(1, "La intensidad es obligatoria"),
    duracion: z.number().positive("La duración debe ser mayor a cero"),
});

export type RutinaInput = z.infer<typeof rutinaSchema>;