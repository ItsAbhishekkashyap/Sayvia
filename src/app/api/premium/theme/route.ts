// src/app/api/premium/theme/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import User from '@/model/user';
import dbconnect from '@/lib/dbconnect';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

export async function POST(req: Request) {
  await dbconnect();
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { theme } = await req.json();
  const allowed = ['default', 'ocean', 'sunset', 'lavender', 'monochrome'];
  if (!allowed.includes(theme)) return NextResponse.json({ error: 'Invalid theme' }, { status: 400 });

  await User.findOneAndUpdate({ email: session.user.email }, { profileTheme: theme });
  return NextResponse.json({ success: true });
}
