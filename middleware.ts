import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const protectedRoutes = ['/learn', '/lesson', '/profile', '/admin', '/api/admin'];
const adminRoutes = ['/admin', '/api/admin'];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtected) {
    if (!token) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const secretKey = process.env.JWT_SECRET || "super_secret_jwt_key_lingala_go_12345";
      const secret = new TextEncoder().encode(secretKey);
      const { payload } = await jwtVerify(token, secret);
      
      // Check Admin Role
      if (adminRoutes.some(route => pathname.startsWith(route))) {
        if (payload.role !== 'ADMIN') {
           if (pathname.startsWith('/api/')) {
             return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
           }
           // Redirect non-admins to learn page
           return NextResponse.redirect(new URL('/learn', request.url));
        }
      }

    } catch (error) {
      // Token invalid
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
