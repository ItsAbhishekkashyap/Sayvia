import mongoose from 'mongoose';

const spamWordSchema = new mongoose.Schema({
  word: { type: String, required: true, unique: true },
});

export default mongoose.models.SpamWord ||
  mongoose.model('SpamWord', spamWordSchema);
