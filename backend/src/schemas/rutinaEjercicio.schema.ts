import z from "zod";

export const rutinaEjercicioSchema = z.object({
    exerciseId: z.string().uuid("Debes seleccionar un ejercicio válido"),
    series: z.number().int().positive().default(3),
    repeticiones: z.number().int().positive(),
    pesoSugerido: z.number().positive(),
    descanso: z.number().int().nonnegative(), // en segundos
    rir: z.number().int().min(0).max(10),     // Reps en Reserva
    notas: z.string().optional()
});

export const actualizarRutinaEjercicioSchema = rutinaEjercicioSchema.partial();

export type rutinaEjercicioInput = z.infer<typeof rutinaEjercicioSchema>;
export type actualizarRutinaEjercicioInput = z.infer<typeof actualizarRutinaEjercicioSchema>;