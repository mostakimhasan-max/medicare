// ─── Auth ────────────────────────────────────────────────────────────────────

export type UserRole = 'ADMIN' | 'DOCTOR' | 'STAFF' | 'PATIENT';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: AuthUser;
  message: string;
}

export interface JWTPayload {
  sub: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  iat: number;
  exp: number;
}
