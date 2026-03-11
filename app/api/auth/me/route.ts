import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { AuthUser } from '@/types';

function getSecret() {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error('JWT_SECRET is not configured');
  return new TextEncoder().encode(s);
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;

  if (!token) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, getSecret());

    const user: AuthUser = {
      id: String(payload.sub),
      name: payload.name as string,
      email: payload.email as string,
      role: payload.role as AuthUser['role'],
      department: payload.department as string | undefined,
    };

    return NextResponse.json({ user }, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
  }
}

