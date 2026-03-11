'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, ChevronDown, LogOut, Menu, Search, User } from 'lucide-react';
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
    <header className="h-16 bg-card/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 lg:px-6 flex-shrink-0 z-10">

      {/* Left â€” hamburger (mobile) + title (mobile) | search (desktop) */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-accent text-muted-foreground transition-colors lg:hidden flex-shrink-0"
          aria-label="Toggle navigation"
        >
          <Menu size={20} />
        </button>

        {/* Mobile: page title */}
        <span className="text-sm font-semibold text-foreground truncate lg:hidden">{title}</span>

        {/* Desktop: search input */}
        <div className="relative w-full hidden lg:block">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search patients, records, or reportsâ€¦"
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-muted border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm text-foreground placeholder:text-muted-foreground transition-all"
          />
        </div>
      </div>

      {/* Right â€” notifications, theme toggle, divider, profile */}
      <div className="flex items-center gap-1 ml-3">

        {/* Notifications */}
        <button className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-accent transition-colors text-muted-foreground">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-card" />
        </button>

        {/* Theme toggle */}
        <ThemeToggle />

        {/* Divider */}
        <div className="h-8 w-px bg-border mx-2 hidden sm:block" />

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowMenu((v) => !v)}
            className="flex items-center gap-3 pl-1 pr-2 py-1.5 rounded-lg hover:bg-accent transition-colors"
            aria-expanded={showMenu}
          >
            {/* Name/role â€” desktop only */}
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold leading-none text-foreground">{user?.name}</p>
              <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wide">
                {user?.role ? ROLE_LABELS[user.role] : ''}
              </p>
            </div>

            {/* Avatar with primary ring */}
            <Avatar
              name={user?.name}
              size="sm"
              className="ring-2 ring-primary/25 ring-offset-1 ring-offset-card"
            />

            <ChevronDown size={14} className="text-muted-foreground hidden sm:block" />
          </button>

          {/* Dropdown menu */}
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
                    {isLoggingOut ? 'Signing outâ€¦' : 'Sign Out'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
