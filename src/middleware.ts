import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Add paths that require authentication
const protectedPaths = ['/account', '/account/dashboard']

// Add paths that should be accessible only for non-authenticated users
const authPaths = ['/auth']

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('user')
  const path = request.nextUrl.pathname

  // Check if the path requires authentication
  const isProtectedPath = protectedPaths.some(prefix => path.startsWith(prefix))
  const isAuthPath = authPaths.some(prefix => path.startsWith(prefix))

  // If it's a protected path and user is not authenticated
  if (isProtectedPath && !currentUser) {
    const url = new URL('/auth', request.url)
    url.searchParams.set('returnUrl', path)
    return NextResponse.redirect(url)
  }

  // If user is authenticated and tries to access auth pages
  if (isAuthPath && currentUser) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
