// src/app/api/premium/custom-link/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import User from '@/model/user';
import dbconnect from '@/lib/dbconnect';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

import { customLinkSchema } from '@/schemas/customLinkSchema';

export async function POST(req: Request) {
  await dbconnect();
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // 3. Validate request payload
  const body = await req.json();
  const parse = customLinkSchema.safeParse(body);
  if (!parse.success) {
    const errorMessage = parse.error.errors[0].message;
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
  const { customLink } = parse.data;

  // 4. Ensure user is premium
  const user = await User.findOne({ email: session.user.email });
  if (!user?.isPremium) {
    return NextResponse.json({ error: 'Upgrade to Premium to customize your link' }, { status: 403 });
  }

  // 5. Check link uniqueness
  const existing = await User.findOne({ customLink });
  if (existing) {
    return NextResponse.json({ error: 'Link already in use' }, { status: 409 });
  }

  // 6. Save custom link
  user.customLink = customLink;
  await user.save();
  await User.findOneAndUpdate({ email: session.user.email }, { customLink });
  return NextResponse.json({ success: true });
}
