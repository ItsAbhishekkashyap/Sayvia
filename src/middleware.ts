import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  const url = request.nextUrl

  const isAuthPage = url.pathname.startsWith('/sign-in') ||
                     url.pathname.startsWith('/sign-up') ||
                     url.pathname.startsWith('/verify')

  const isProtectedPage = url.pathname.startsWith('/dashboard')

  // ✅ 1. If user is logged in and verified, prevent them from visiting auth pages
  if (token && token.isVerified && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // ✅ 2. If user is NOT logged in and tries to access protected route
  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  // ✅ 3. If user is logged in but NOT verified — allow access only to /verify
  if (token && !token.isVerified && !url.pathname.startsWith('/verify')) {
    return NextResponse.redirect(new URL(`/verify/${token.username}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/sign-in',
    '/sign-up',
    '/verify/:path*',
    '/dashboard/:path*',
  ]
}