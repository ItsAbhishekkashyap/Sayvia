// src/app/api/auth/reset-password/route.ts
import { NextResponse } from 'next/server';
import User from '@/model/user';
import dbConnect from '@/lib/dbconnect';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  await dbConnect();
  
  try {
    const { token, password } = await request.json();
    console.log("🔑 Received token:", token);
    console.log("🕒 Current time:", new Date()); // Debug log

    if (!token) {
      console.log("No token provided");
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    // Find user with this token and check expiry
    const user = await User.findOne({ 
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() } // Check if expiry is in future
    });

    console.log("👤 User found:", user ? user._id : "None"); // Debug log

    if (!user) {
        // Check why no user was found
        const expiredUser = await User.findOne({ resetToken: token });
        if (expiredUser) {
          console.log("⏰ Token expired at:", expiredUser.resetTokenExpiry);
        } else {
          console.log("❌ No user found with this token");
        }
        return NextResponse.json(
          { error: 'Invalid or expired token' },
          { status: 400 }
        );
      }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user and clear token
    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      resetToken: undefined,
      resetTokenExpiry: undefined
    });

    return NextResponse.json({ 
      success: true,
      message: 'Password reset successfully' 
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}