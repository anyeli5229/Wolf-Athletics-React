import z from "zod";

export const ejercicioSchema = z.object({
    nombre: z.string().min(1, "El nombre del ejercicio es obligatorio"),
    descripcion: z.string().optional(),
    grupoMuscular: z.string().min(1, "Debes de agregar el grupo muscular que trabajas con el ejercicio"),
    equipo: z.string().optional(),
});


export const actualizarEjercicioSchema = ejercicioSchema.partial();

export type EjercicioInput = z.infer<typeof ejercicioSchema>;
export type ActualizarEjercicioInput = z.infer<typeof actualizarEjercicioSchema>;