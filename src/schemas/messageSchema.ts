import { z } from "zod";

// ynha messageSchema ke validation pr kaam hoga

export const messageSchema = z.object({
    content: z
    .string()
    .min(10,{message: "content must be atleast of 10 characters"})
    .max(300, {message: "content max be of 300 characters"})
   
})