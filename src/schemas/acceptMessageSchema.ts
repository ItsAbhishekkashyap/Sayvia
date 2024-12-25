import { z } from "zod";

// ynha acceptingmessageschema ke validation pr kaam hoga

export const acceptMessageSchema = z.object({
    acceptMessages: z.boolean(), 
   
})