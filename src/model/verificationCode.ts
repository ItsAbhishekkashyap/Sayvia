import mongoose, { Schema, Document } from "mongoose";

export interface IVerificationCode extends Document {
  email: string;
  username: string;
  code: string;
  createdAt: Date;
}

const VerificationCodeSchema = new Schema<IVerificationCode>({
  email: { type: String, required: true },
  username: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 600 }, // expires in 10 minutes
});

// Prevent model overwrite in development
export default mongoose.models.VerificationCode ||
  mongoose.model<IVerificationCode>("VerificationCode", VerificationCodeSchema);
