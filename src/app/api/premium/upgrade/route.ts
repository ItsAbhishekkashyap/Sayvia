// src/app/api/premium/upgrade/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import User from "@/model/user";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const user = await User.findOneAndUpdate(
    { email: session.user.email },
    { isPremium: true },
    { new: true }
  );

  if (!user) {
    return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: "User upgraded to premium." });
}
