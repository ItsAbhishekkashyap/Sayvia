import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Skip middleware for NextAuth API routes
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production", // Add this line
  });

  console.log("Cookies:", request.cookies.getAll());

  const url = request.nextUrl;

  console.log("Token:", token);


  const isAuthPage = pathname.startsWith('/sign-in') ||
                     pathname.startsWith('/sign-up') ||
                     pathname.startsWith('/verify');

  const isProtectedPage = pathname.startsWith('/dashboard');

  // ✅ 1. If user is logged in and verified, prevent them from visiting auth pages
  if (token && token.isVerified && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // ✅ 2. If user is NOT logged in and tries to access protected route
  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // ✅ 3. If user is logged in but NOT verified — allow access only to /verify
  if (token && !token.isVerified && !pathname.startsWith('/verify')) {
    return NextResponse.redirect(new URL(`/verify/${token.username}`, request.url));
  }
  console.log("Middleware token:", token);
console.log("Path:", pathname);



  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/sign-in',
    '/sign-up',
    '/verify/:path*',
    '/dashboard/:path*',
    // ⚠️ Don't try to negate API paths here — we excluded it manually above
  ]
};
