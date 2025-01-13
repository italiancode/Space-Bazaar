import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  const isAuthPage = request.nextUrl.pathname === '/auth';

  // Redirect authenticated users from auth page
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/account', request.url));
  }

  // Redirect unauthenticated users from protected routes
  if (request.nextUrl.pathname.startsWith('/account') && !token) {
    const redirectUrl = new URL('/auth', request.url);
    redirectUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/account/:path*', '/auth'],
};