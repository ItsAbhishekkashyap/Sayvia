// hm chahte hai ki resend ko poora poora use kr pay.
import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);
console.log("RESEND API KEY:", process.env.RESEND_API_KEY);
