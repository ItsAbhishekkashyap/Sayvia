import mongoose from 'mongoose';

const abuseSchema = new mongoose.Schema({
  message: String,
  ip: String,
  reason: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.AbuseReport ||
  mongoose.model('AbuseReport', abuseSchema);
