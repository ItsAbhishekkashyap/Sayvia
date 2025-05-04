import SpamWord from '@/model/SpamWord';

export async function isSpamMessage(message: string): Promise<boolean> {
  const spamWords = await SpamWord.find({});
  const spamList = spamWords.map(w => w.word.toLowerCase());

  return spamList.some(word => message.toLowerCase().includes(word));
}
