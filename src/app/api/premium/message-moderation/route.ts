// src/app/api/premium/message-moderation/route.ts
import dbConnect from "@/lib/dbconnect";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import User from "@/model/user";

export async function POST(req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { enabled } = await req.json(); // boolean

  await User.findOneAndUpdate(
    { email: session.user.email },
    { messageModeration: enabled }
  );

  return NextResponse.json({ success: true });
}
