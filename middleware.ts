import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// ─── Route protection map ─────────────────────────────────────────────────────
// Maps URL prefixes to the roles that may access them.
// An ADMIN is granted access to all protected areas.

const ROUTE_ROLES: Record<string, string[]> = {
  '/admin': ['ADMIN'],
  '/doctor': ['DOCTOR', 'ADMIN'],
  '/staff': ['STAFF', 'ADMIN'],
  '/patient': ['PATIENT', 'ADMIN'],
};

const PUBLIC_PATHS = ['/login', '/api/auth'];

function getSecret() {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error('JWT_SECRET env variable is not set');
  return new TextEncoder().encode(s);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths unconditionally
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const token = request.cookies.get('auth-token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const { payload } = await jwtVerify(token, getSecret());
    const role = payload.role as string;

    // Check whether current path is a protected area
    const matchedPrefix = Object.keys(ROUTE_ROLES).find((prefix) =>
      pathname.startsWith(prefix),
    );

    if (matchedPrefix) {
      const allowed = ROUTE_ROLES[matchedPrefix];
      if (!allowed.includes(role)) {
        // Redirect to the user's own dashboard instead of 403
        const homeMap: Record<string, string> = {
          ADMIN: '/admin/dashboard',
          DOCTOR: '/doctor/dashboard',
          STAFF: '/staff/dashboard',
          PATIENT: '/patient/dashboard',
        };
        return NextResponse.redirect(
          new URL(homeMap[role] ?? '/login', request.url),
        );
      }
    }

    // Attach role header for downstream Server Components if needed
    const response = NextResponse.next();
    response.headers.set('x-user-role', role);
    response.headers.set('x-user-id', String(payload.sub));
    return response;
  } catch {
    // Invalid / expired token — clear the cookie and redirect to login
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('auth-token');
    return response;
  }
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/doctor/:path*',
    '/staff/:path*',
    '/patient/:path*',
    // Exclude Next.js internals and static files
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
