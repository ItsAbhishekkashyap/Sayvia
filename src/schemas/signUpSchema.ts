import { z } from "zod";
 
// sabse phle hm user ko validate krvange aur usko export bhi kr denge taki baki kisi bhi jagh pr use kr ske 


// ynha hmne username ki validation check kr li hai
// ynha pe ek hi value thi to is liye z.string sidhe use kr liya.
export const usernameValidation = z
    .string()
    .min(2,"Username must be atleast 2 characters")
    .max(20,"Username must be must be no more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special character") 
 // zod itna hi hai so take a chill pill.

 // ab hm signup ki validation pe kaam karenge

 export const signUpSchema = z.object({
    // z.object use kiya hai kyoki multiple values hai
    username: usernameValidation, //seedha ynhi pe use kr liya
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters"})

 })

 // ynha signup schema ka validation ho gya