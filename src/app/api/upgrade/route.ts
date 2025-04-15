// src/app/api/upgrade/route.ts
import { getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/model/user";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await UserModel.updateOne({ email: session.user.email }, { $set: { isPremium: true } });

  return NextResponse.json({ message: "Upgraded to premium!" });
}
