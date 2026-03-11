'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { authService } from '@/services/auth.service';

/**
 * Hydrates the Zustand auth store by verifying the server-side session
 * on every full-page load. This ensures the client state stays in sync
 * with the httpOnly cookie even after a hard refresh.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, clearUser, setLoading, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const verify = async () => {
      setLoading(true);
      const user = await authService.me();
      if (user) {
        setUser(user);
      } else {
        clearUser();
      }
    };
    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
