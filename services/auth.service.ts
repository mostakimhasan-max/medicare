import { AuthUser, LoginCredentials } from '@/types';

// ─── Auth Service ─────────────────────────────────────────────────────────────
// Calls the internal Next.js API routes (/api/auth/*) which manage
// the httpOnly JWT cookie server-side. The client never touches the raw token.

export const authService = {
  /**
   * POST /api/auth/login
   * Returns the authenticated user; cookie is set server-side.
   */
  async login(credentials: LoginCredentials): Promise<AuthUser> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      credentials: 'include',
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data.user as AuthUser;
  },

  /**
   * POST /api/auth/logout
   * Clears the httpOnly cookie server-side.
   */
  async logout(): Promise<void> {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  },

  /**
   * GET /api/auth/me
   * Verifies the current cookie and returns the user — used to hydrate
   * Zustand state after a page refresh.
   */
  async me(): Promise<AuthUser | null> {
    try {
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      if (!res.ok) return null;
      const data = await res.json();
      return data.user as AuthUser;
    } catch {
      return null;
    }
  },
};
