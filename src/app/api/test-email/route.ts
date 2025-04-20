import { resend } from "@/lib/resend";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await resend.emails.send({
      from: "support@sayvia.xyz",
      to: "test-hkihprii3@srv1.mail-tester.com", // Replace this with the real mail-tester address
      subject: "Sayvia Test Email",
      html: "<p>This is a test email from Sayvia.</p>",
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error sending test email:", error);
    return NextResponse.json({ success: false, error });
  }
}
