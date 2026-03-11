'use client';

import { AuthProvider } from './AuthProvider';
import { NotificationToast } from '@/components/layout/NotificationToast';

/**
 * Root client-side wrapper. Add any global providers here.
 * Kept as a separate 'use client' component so app/layout.tsx stays a
 * Server Component and benefits from RSC optimisations.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <NotificationToast />
    </AuthProvider>
  );
}
