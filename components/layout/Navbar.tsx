'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, Bell, LogOut, User, ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Avatar } from '@/components/ui/Avatar';
import { useAuthStore } from '@/store/auth.store';
import { authService } from '@/services/auth.service';
import { ROLE_LABELS } from '@/utils/constants';

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
    <header className="flex items-center gap-4 bg-white border-b border-slate-200 px-4 h-14 flex-shrink-0">
      {/* Mobile menu toggle */}
      <button
        onClick={onMenuClick}
        className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 lg:hidden"
        aria-label="Toggle navigation"
      >
        <Menu size={20} />
      </button>

      {/* Page title */}
      <h1 className="text-base font-semibold text-slate-800 flex-1 truncate">{title}</h1>

      {/* Notification bell */}
      <button className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-500">
        <Bell size={18} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white" />
      </button>

      {/* Profile dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowMenu((v) => !v)}
          className={cn(
            'flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-lg',
            'hover:bg-slate-100 transition-colors',
          )}
          aria-expanded={showMenu}
        >
          <Avatar name={user?.name} size="sm" />
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-slate-800 leading-tight">{user?.name}</p>
            <p className="text-[10px] text-slate-500 leading-tight">
              {user?.role ? ROLE_LABELS[user.role] : ''}
            </p>
          </div>
          <ChevronDown size={14} className="text-slate-400" />
        </button>

        {/* Dropdown */}
        {showMenu && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-200 z-20 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-sm font-semibold text-slate-900 truncate">{user?.name}</p>
                <p className="text-xs text-slate-500 truncate">{user?.email}</p>
              </div>
              <div className="p-1.5">
                <button
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  onClick={() => setShowMenu(false)}
                >
                  <User size={15} className="text-slate-400" />
                  My Profile
                </button>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 transition-colors"
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
