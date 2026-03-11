'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';

const ROLE_REDIRECTS: Record<string, string> = {
  admin: '/admin/dashboard',
  doctor: '/doctor/dashboard',
  staff: '/staff/dashboard',
  patient: '/patient/dashboard',
};

export default function Home() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && user) {
      router.replace(ROLE_REDIRECTS[user.role] ?? '/login');
    } else {
      router.replace('/login');
    }
  }, [isAuthenticated, user, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
      <div className="text-muted-foreground text-sm">Redirecting…</div>
    </div>
  );
}

