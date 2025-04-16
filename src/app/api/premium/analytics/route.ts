// src/app/api/premium/analytics/route.ts
import dbConnect from "@/lib/dbconnect";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import User from "@/model/user";
export async function GET() {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
    const user = await User.findOne({ email: session.user.email });
    return NextResponse.json({ analytics: user.analytics });
  }
  