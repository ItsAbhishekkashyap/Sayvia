import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/user";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  // Connect to the database
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    // 1. Check if the username is already taken and verified
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username already taken",
        },
        { status: 400 }
      );
    }

    // 2. Handle unverified username
    const existingUserByUsername = await UserModel.findOne({ username });
    let verifyCode: string;

    if (existingUserByUsername && !existingUserByUsername.isVerified) {
      verifyCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate the verification code

      const hashedPassword = await bcrypt.hash(password, 10);
      existingUserByUsername.email = email; // Update email if needed
      existingUserByUsername.password = hashedPassword;
      existingUserByUsername.verifyCode = verifyCode;
      existingUserByUsername.verifyCodeExpiry = new Date(Date.now() + 3600000); // 1 hour expiration
      await existingUserByUsername.save();

      // Send verification email again
      const emailResponse = await sendVerificationEmail(
        email,
        username,
        verifyCode
      );

      if (!emailResponse.success) {
        return Response.json(
          {
            success: false,
            message: emailResponse.message,
          },
          { status: 500 }
        );
      }

      return Response.json(
        {
          success: true,
          message: "Verification code resent. Please verify your email.",
        },
        { status: 200 }
      );
    }

    // 3. Check if the user exists by email
    const existingUserByEmail = await UserModel.findOne({ email });

    if (existingUserByEmail) {
      // If user already exists but is not verified
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exists with this email",
          },
          { status: 400 }
        );
      } else {
        verifyCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate verification code

        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000); // 1 hour expiration
        await existingUserByEmail.save();
      }
    } else {
      // If it's a new user, create the user
      verifyCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate verification code

      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1); // Set expiration for the verification code

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });

      await newUser.save();
    }

    // Send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );

    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "User registered successfully. Please verify your email",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      {
        status: 500,
      }
    );
  }
}
