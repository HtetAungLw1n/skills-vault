import z from "zod";

export const skillSchema = z.object({
  title: z.string().max(20),
  description: z.string().max(100).optional(),
  content: z.string(),
});
