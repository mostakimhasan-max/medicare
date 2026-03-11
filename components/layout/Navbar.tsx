'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, Bell, LogOut, User, ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Avatar } from '@/components/ui/avatar';
import { useAuthStore } from '@/store/auth.store';
import { authService } from '@/services/auth.service';
import { ROLE_LABELS } from '@/utils/constants';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface NavbarProps {
  title: string;
  onMenuClick: () => void;
}

export function Navbar({ title, onMenuClick }: NavbarProps) {
  const router = useRouter();
  const { user, clearUser } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authService.logout();
    } finally {
      clearUser();
      router.push('/login');
    }
  };

  return (
    <header className="flex items-center gap-4 bg-card border-b border-border px-4 h-14 flex-shrink-0">
      {/* Mobile menu toggle */}
      <button
        onClick={onMenuClick}
        className="p-2 rounded-lg hover:bg-accent text-muted-foreground lg:hidden"
        aria-label="Toggle navigation"
      >
        <Menu size={20} />
      </button>

      {/* Page title */}
      <h1 className="text-base font-semibold text-foreground flex-1 truncate">{title}</h1>

      {/* Theme toggle */}
      <ThemeToggle />

      {/* Notification bell */}
      <button className="relative p-2 rounded-lg hover:bg-accent text-muted-foreground">
        <Bell size={18} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-card" />
      </button>

      {/* Profile dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowMenu((v) => !v)}
          className={cn(
            'flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-lg',
            'hover:bg-accent transition-colors',
          )}
          aria-expanded={showMenu}
        >
          <Avatar name={user?.name} size="sm" />
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-foreground leading-tight">{user?.name}</p>
            <p className="text-[10px] text-muted-foreground leading-tight">
              {user?.role ? ROLE_LABELS[user.role] : ''}
            </p>
          </div>
          <ChevronDown size={14} className="text-muted-foreground" />
        </button>

        {/* Dropdown */}
        {showMenu && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
            <div className="absolute right-0 mt-2 w-52 bg-popover rounded-xl shadow-lg border border-border z-20 overflow-hidden">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-sm font-semibold text-popover-foreground truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
              <div className="p-1.5">
                <button
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setShowMenu(false)}
                >
                  <User size={15} className="text-muted-foreground" />
                  My Profile
                </button>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-destructive rounded-lg hover:bg-destructive/10 transition-colors"
                >
                  <LogOut size={15} />
                  {isLoggingOut ? 'Signing out…' : 'Sign Out'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

