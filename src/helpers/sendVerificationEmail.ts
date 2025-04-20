import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { Router } from "next/router";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "support@sayvia.xyz",
      to: email,
      subject: "Sayvia | Your Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
      text: `Hey ${username},\n\nThanks for signing up with Sayvia! Here's your verification code: ${verifyCode}\n\nIf you didn’t request this, feel free to ignore the email.\n\n– Team Sayvia`,
    });
    return { success: true, message: " Verification email send successfully" };
  } catch (emailError) {
    console.error("Error sending verification email", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
  console.log("Sending verification to:", email);
  console.log("OTP Code:", verifyCode);
}
