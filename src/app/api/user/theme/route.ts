// src/app/api/user/theme/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import User from '@/model/user';

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return NextResponse.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  const user = await User.findById(session.user._id);
  return NextResponse.json({
    success: true,
    themePreferences: user.themePreferences
  });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const { theme, colorTheme } = await req.json();

  if (!session?.user) {
    return NextResponse.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      session.user._id,
      { 
        themePreferences: { 
          theme: theme || 'system',
          colorTheme: colorTheme || 'default'
        } 
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      themePreferences: updatedUser.themePreferences
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error updating theme preferences' },
      { status: 500 }
    );
  }
}