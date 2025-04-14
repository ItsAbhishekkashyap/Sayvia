import dbConnect from "@/lib/dbconnect";
import UserModel, { IMessage } from "@/model/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();

  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return Response.json({ success: false, message: "User not found" }, { status: 404 });
    }

    if (!user.isAcceptingMessage) {
      return Response.json({ success: false, message: "User is not accepting messages at the moment" }, { status: 403 });
    }

    // ✅ Define message object first
    const newMessage: IMessage = {
      content: content,
      createdAt: new Date(),
    } as IMessage;

    user.messages.push(newMessage); // ✅ Now this works
    await user.save();

    return Response.json(
      {
        success: true,
        message: "Message sent successfully",
      },
      { status: 200 }
    );

  } catch (error) {
    console.log("Error adding messages", error);
    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}







