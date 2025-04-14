// src/app/api/get-messages/route.ts
import { getServerSession } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]/options";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/user";

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const user = await UserModel.findOne({ username: session.user.username });

  if (!user) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    messages: user.messages.reverse(), // show latest first
  });
}
