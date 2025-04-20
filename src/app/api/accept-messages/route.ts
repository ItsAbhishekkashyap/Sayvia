import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/user";
// Assuming Message model exists
import { NextResponse } from "next/server";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema"; // Assuming the schema for messages

export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !session.user) {
    return NextResponse.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }

  const userId = user?._id;
  const { acceptMessages, message, mood } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessage: acceptMessages },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update user status to accept messages",
        },
        { status: 401 }
      );
    }

   

   

    return NextResponse.json(
      {
        success: true,
        message: "Message and mood saved successfully",
        updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to update user status or save message", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update user status or save message",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !session.user) {
    return NextResponse.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }

  const userId = user?._id;

  try {
    const foundUser = await UserModel.findById(userId);

    if (!foundUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        isAcceptingMessage: foundUser.isAcceptingMessage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to get user status", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in getting acceptance message",
      },
      { status: 500 }
    );
  }
}


