import { NextResponse } from 'next/server';
import User from '@/model/user';
import dbConnect from '@/lib/dbconnect';
import { Resend } from 'resend';
import crypto from 'crypto';
import mongoose from 'mongoose';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // 1. Connect to database
    await dbConnect();
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database connection failed');
    }

    // 2. Parse request
    const { email } = await request.json();
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // 3. Start transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 4. Find user
      const user = await User.findOne({ email }).session(session);
      if (!user) {
        await session.commitTransaction();
        return NextResponse.json(
          { success: true, message: 'If an account exists, you will receive a reset link' },
          { status: 200 }
        );
      }

      // 5. Generate token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

      // 6. Update user
      const updateResult = await User.updateOne(
        { _id: user._id },
        { $set: { resetToken, resetTokenExpiry } },
        { session }
      );

      if (updateResult.modifiedCount !== 1) {
        throw new Error('Failed to save token');
      }

      // 7. Verify update
      const updatedUser = await User.findById(user._id).session(session);
      if (!updatedUser?.resetToken) {
        throw new Error('Token not persisted');
      }

      await session.commitTransaction();

      // 8. Send email
      const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;
      const { error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Password Reset Request',
        html: `<p>Reset link: <a href="${resetLink}">${resetLink}</a></p>`
      });

      if (error) throw error;

      return NextResponse.json({
        success: true,
        message: 'Password reset link sent'
      });

    } catch (error) {
      await session.abortTransaction();
      console.error('Transaction error:', error);
      throw error;
    } finally {
      session.endSession();
    }

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}