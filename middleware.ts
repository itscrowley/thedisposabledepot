import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // ✅ Corrected Spelling here
  const isLoggedIn = request.cookies.get('admin_token')?.value;

  // 1. Agar user '/admin' par ja raha hai aur LOGIN NAHI hai -> Login pe bhejo
  if (path.startsWith('/admin') && !path.startsWith('/admin/login') && !isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // 2. Agar user Login page par hai aur PEHLE SE LOGGED IN hai -> Admin pe bhejo
  if (path === '/admin/login' && isLoggedIn) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
