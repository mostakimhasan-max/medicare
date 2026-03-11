import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { AuthUser, UserRole } from '@/types';

// ─── Mock user database ───────────────────────────────────────────────────────
// In production: query your real database and hash-compare passwords.

interface MockUser {
  id: string;
  name: string;
  email: string;
  password: string; // plain text only for demo — use bcrypt in production
  role: UserRole;
  department?: string;
}

const MOCK_USERS: MockUser[] = [
  {
    id: 'u1',
    name: 'Admin User',
    email: 'admin@medicare.com',
    password: 'password123',
    role: 'ADMIN',
  },
  {
    id: 'u2',
    name: 'Dr. Sarah Johnson',
    email: 'doctor@medicare.com',
    password: 'password123',
    role: 'DOCTOR',
    department: 'Cardiology',
  },
  {
    id: 'u3',
    name: 'Robert Kim',
    email: 'staff@medicare.com',
    password: 'password123',
    role: 'STAFF',
    department: 'Emergency',
  },
  {
    id: 'u4',
    name: 'John Smith',
    email: 'patient@medicare.com',
    password: 'password123',
    role: 'PATIENT',
  },
];

function getSecret() {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error('JWT_SECRET is not configured');
  return new TextEncoder().encode(s);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body as { email: string; password: string };

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 },
      );
    }

    const user = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
    );

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 },
      );
    }

    // Sign a proper JWT — secret never leaves the server
    const token = await new SignJWT({
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(getSecret());

    // Build the public user object returned to the client (no token in body)
    const authUser: AuthUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
    };

    const response = NextResponse.json(
      { user: authUser, message: 'Login successful' },
      { status: 200 },
    );

    // Set httpOnly cookie — not accessible from JS (XSS protection)
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('[/api/auth/login]', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
