import { z } from 'zod';

export const customLinkSchema = z.object({
  customLink: z
    .string({ required_error: "Required" })
    .min(3, "Must be at least 3 characters")
    .max(30, "Must be at most 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed"),
});
