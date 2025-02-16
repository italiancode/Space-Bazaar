import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Add paths that require authentication
const protectedPaths = [
  '/account', 
  '/account/dashboard',
  '/checkout',
  '/orders',
  '/profile'
];

// Add paths that should be accessible only for non-authenticated users
const authPaths = ['/auth'];
// 
// Public paths that don't need authentication
// const publicPaths = [
//   '/',
//   '/products',
//   '/categories',
//   '/about',
//   '/contact',
//   '/privacy',
//   '/terms',
//   '/faqs'
// ];

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('user');
  const path = request.nextUrl.pathname;
  
  // Parse user data safely
  let userData = null;
  try {
    userData = currentUser ? JSON.parse(currentUser.value) : null;
  } catch (e) {
    console.error('Error parsing user cookie:', e);
  }

  // Check if the path requires authentication
  const isProtectedPath = protectedPaths.some(prefix => path.startsWith(prefix));
  const isAuthPath = authPaths.some(prefix => path.startsWith(prefix));

  // If it's a protected path and user is not authenticated
  if (isProtectedPath && !userData) {
    const url = new URL('/auth', request.url);
    url.searchParams.set('returnUrl', path);
    return NextResponse.redirect(url);
  }

  // If user is authenticated and tries to access auth pages
  if (isAuthPath && userData) {
    const returnUrl = new URL(request.nextUrl).searchParams.get('returnUrl');
    return NextResponse.redirect(new URL(returnUrl || '/', request.url));
  }

  return NextResponse.next();
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
};
