import z from "zod";

export const createWishlistSchema = z.object({
  title: z
    .string()
    .min(2, {
      error: "El título debe tener al menos 3 caracteres",
    })
    .max(100, { error: "El título no puede superar los 100 caracteres" }),
  description: z
    .string()
    .max(500, { error: "La descripción no puede superar los 500 caracteres" })
    .optional(),
  visibility: z.enum(["public", "private"], {
    error: "La visibilidad es obligatoria",
  }),
  coverImage: z.string({ error: "Debe ser una URL valida" }).optional(),
});

export type CreateWishlistInput = z.infer<typeof createWishlistSchema>;
