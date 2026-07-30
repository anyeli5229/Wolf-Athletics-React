import z from "zod";

export const rutinaSchema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    descripcion: z.string().optional(),
    nivel: z.string().optional(),
    duracion: z.number().positive("La duración debe ser mayor a cero").optional(),
});

// Esquema parcial de Zod
export const actualizarRutinaSchema = rutinaSchema.partial();

export type RutinaInput = z.infer<typeof rutinaSchema>;
export type ActualizarRutinaInput = z.infer<typeof actualizarRutinaSchema>;