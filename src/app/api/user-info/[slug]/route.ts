// Find user by username or customLink
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import User from "@/model/user";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  await dbConnect();
  const slug = params.slug;

  const user = await User.findOne({
    $or: [{ username: slug }, { customLink: slug }],
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ username: user.username });
}
