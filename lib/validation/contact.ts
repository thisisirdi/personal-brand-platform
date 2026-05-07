import { z } from "zod";

export const contactInputSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(80, "Name must be 80 characters or less."),
  email: z
    .email("Use a valid email address.")
    .trim()
    .max(120, "Email must be 120 characters or less."),
  message: z
    .string()
    .trim()
    .min(20, "Message must be at least 20 characters.")
    .max(2000, "Message must be 2000 characters or less."),
  source: z.string().trim().max(80).optional(),
});

export type ContactInput = z.infer<typeof contactInputSchema>;
