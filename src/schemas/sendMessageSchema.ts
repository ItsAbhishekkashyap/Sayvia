import {z} from "zod";

export const sendMessageSchema = z.object({
    username: z.string().min(1,"Username is required"),
    content: z.string().min(1, "Message content cannot be empty"),
    mood:z.string().optional(),
    customLink: z.string()
    .min(3, "Must be at least 3 characters")
    .max(30, "Must be at most 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed"),
    
})