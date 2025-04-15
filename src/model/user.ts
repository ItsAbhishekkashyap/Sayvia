import mongoose, { Schema, Document, Types, model, models } from "mongoose";

// Message Interface & Schema remains same
export interface IMessage extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<IMessage> = new Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Enhanced User Interface
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isAcceptingMessage: boolean;
  isVerified: boolean;
  messages: Types.DocumentArray<IMessage>;
  resetToken?: string;
  resetTokenExpiry?: Date;
  isPremium: boolean;
}

const UserSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please use a valid email address"]
  },

  isPremium: {
    type: Boolean,
    default: false
  },  
  password: { type: String, required: [true, "Password is required"] },
  verifyCode: { type: String, required: [true, "Verify Code is required"] },
  verifyCodeExpiry: { type: Date, required: [true, "Verify Code expiry is required"] },
  isVerified: { type: Boolean, default: false },
  isAcceptingMessage: { type: Boolean, default: true },
  messages: [MessageSchema],
  resetToken: { type: String },
  resetTokenExpiry: { type: Date }
}, { timestamps: true });

// Add indexes
UserSchema.index({ resetToken: 1 }, { unique: true, sparse: true });
UserSchema.index({ resetTokenExpiry: 1 });

// Create model
const User = models.User || model<IUser>("User", UserSchema);

export default User;