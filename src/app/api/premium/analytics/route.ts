// src/app/api/premium/analytics/route.ts
import dbConnect from "@/lib/dbconnect";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import User from "@/model/user";
export async function GET(req: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const userEmail = session.user.email;

  // Group messages by date (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

  const data = await User.aggregate([
      { $match: { receiverEmail: userEmail, createdAt: { $gte: sevenDaysAgo } } },
      {
          $group: {
              _id: {
                  $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
              },
              count: { $sum: 1 }
          }
      },
      { $sort: { _id: 1 } }
  ]);

  return NextResponse.json({ success: true, data });
}
  