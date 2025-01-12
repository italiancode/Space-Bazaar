import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the auth cookie
  const token = request.cookies.get('auth-token');
  const isAuthPage = request.nextUrl.pathname === '/auth';

  // If user is on auth page and has token, redirect to account
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/account', request.url));
  }

  // If accessing protected routes without token, redirect to auth
  if (request.nextUrl.pathname.startsWith('/account')) {
    if (!token) {
      const redirectUrl = new URL('/auth', request.url);
      redirectUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/account/:path*', '/auth']
};