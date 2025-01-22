import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accountId = request.cookies.get('accountId')?.value;
  const publicRoutes = ['/'];
  const privateRoutes = ['/session/home'];

  const path = request.nextUrl.pathname;

  if (publicRoutes.includes(path) && accountId) {
    return NextResponse.redirect(new URL('/session/home', request.url));
  }

  if (privateRoutes.includes(path) && !accountId) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/session/home'],
};
