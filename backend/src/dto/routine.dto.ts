import z from "zod";

export const crearRutinaSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().optional(),
  nivel: z.string().optional(),
  duracion: z.number().int().positive().optional(),
  userId: z.string().uuid(),
});

export type CrearRutinaDTO = z.infer<typeof crearRutinaSchema>;