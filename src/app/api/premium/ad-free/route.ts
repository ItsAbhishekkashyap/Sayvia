import dbConnect from "@/lib/dbconnect";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import User from "@/model/user";

// src/app/api/premium/ad-free/route.ts
export async function POST(req: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
    const { enabled } = await req.json();
    await User.findOneAndUpdate({ email: session.user.email }, { adFree: enabled });
    return NextResponse.json({ success: true });
  }
  