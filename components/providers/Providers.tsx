'use client';

import { AuthProvider } from './AuthProvider';
import { ThemeProvider } from './ThemeProvider';
import { NotificationToast } from '@/components/layout/NotificationToast';
import { Toaster } from '@/components/ui/sonner';

/**
 * Root client-side wrapper. Add any global providers here.
 * Kept as a separate 'use client' component so app/layout.tsx stays a
 * Server Component and benefits from RSC optimisations.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        {children}
        <NotificationToast />
        <Toaster richColors closeButton />
      </AuthProvider>
    </ThemeProvider>
  );
}


