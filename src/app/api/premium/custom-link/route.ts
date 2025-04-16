// src/app/api/premium/custom-link/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import User from '@/model/user';
import dbconnect from '@/lib/dbconnect';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

export async function POST(req: Request) {
  await dbconnect();
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { customLink } = await req.json();
  const regex = /^[a-zA-Z0-9_]+$/;
  if (!regex.test(customLink)) return NextResponse.json({ error: 'Invalid characters' }, { status: 400 });

  const exists = await User.findOne({ customLink });
  if (exists) return NextResponse.json({ error: 'Link already in use' }, { status: 409 });

  await User.findOneAndUpdate({ email: session.user.email }, { customLink });
  return NextResponse.json({ success: true });
}
