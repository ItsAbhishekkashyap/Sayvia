// // /pages/api/resend-verification.ts
// import { NextRequest, NextResponse } from "next/server";
// import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
// import { generateVerificationCode } from "@/lib/generateVerificationCode";
// // adjust according to your db setup
// import { ApiResponse } from "@/types/ApiResponse";
// import dbConnect from "@/lib/dbconnect";

// export async function POST(req: Request): Promise<NextResponse<ApiResponse>> {
//   const { username } = await req.json();

//   if (!username) {
//     return NextResponse.json(
//       { success: false, message: "Username is required" },
//       { status: 400 }
//     );
//   }

//   const user = await dbConnect.user.findUnique({
//     where: { username },
//   });

//   if (!user || !user.email) {
//     return NextResponse.json(
//       { success: false, message: "User not found" },
//       { status: 404 }
//     );
//   }

//   const newCode = generateVerificationCode();

//   await dbConnect.verificationCode.upsert({
//     where: { username },
//     update: { code: newCode },
//     create: { username, code: newCode },
//   });

//   const emailResponse = await sendVerificationEmail(
//     user.email,
//     username,
//     newCode
//   );

//   return NextResponse.json(emailResponse);
// }
