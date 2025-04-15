// src/types/user.ts
import { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
  resetToken?: string;      // Add this for password reset
  resetTokenExpiry?: Date;  // Add this for password reset
  createdAt: Date;
  updatedAt: Date;
}