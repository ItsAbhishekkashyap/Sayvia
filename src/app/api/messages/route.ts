
import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);
const dbName = 'test'; // ✅ Corrected from 'feedback-db' to 'test'

export async function GET() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const usersCollection = db.collection('users'); // ✅ Use correct collection

    // Fetch all users with non-empty messages array
    const usersWithMessages = await usersCollection
      .find({ messages: { $exists: true, $ne: [] } })
      .toArray();

    // Flatten and enrich messages
    const allMessages = usersWithMessages.flatMap(user =>
      user.messages.map((msg: any) => ({
        ...msg,
        userId: user._id,
        username: user.username,
      }))
    );

    // Sort messages by createdAt (newest first)
    const sortedMessages = allMessages.sort(
      (a, b) => b.createdAt - a.createdAt
    );

    return NextResponse.json({ messages: sortedMessages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

