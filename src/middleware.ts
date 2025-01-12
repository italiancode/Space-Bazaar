import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the user's authentication status from cookies or headers
  const isAuthenticated = request.cookies.get('authenticated');

  // List of protected paths
  const protectedPaths = ['/dashboard'];

  // Check if the current path is protected
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath && !isAuthenticated) {
    // Redirect to login page if trying to access protected route while not authenticated
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*']
}; 