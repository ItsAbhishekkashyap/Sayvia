import { z } from "zod";

// ynha verifySchema ke validation pr kaam hoga

export const verifySchema = z.object({
    code: z.string().length(6, "Verification code must be 6 digits")
})