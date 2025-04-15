import { z } from "zod";

// ynha SignIn ke validation pr kaam hoga

export const signInSchema = z.object({
    identifier: z.string().min(1, "Email or username is required"), // identifier ki jgha username ya email bhi bol skte hai
    password: z.string().min(1, "Password is required"),
})