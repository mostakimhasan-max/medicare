'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Activity } from 'lucide-react';
import { cn } from '@/utils/cn';
import { SidebarItem } from '@/types';
import { Avatar } from '@/components/ui/avatar';
import { useAuthStore } from '@/store/auth.store';

interface SidebarProps {
  items: SidebarItem[];
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ items, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuthStore();

  return (
    <>
      {/* Backdrop (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-30 w-64 flex flex-col',
          'bg-sidebar text-sidebar-foreground',
          'transition-transform duration-300 ease-in-out',
          'lg:relative lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <Activity size={16} className="text-sidebar-primary-foreground" />
            </div>
            <div>
              <span className="font-bold text-sm text-sidebar-foreground block leading-tight">Medicare</span>
              <span className="text-[10px] text-sidebar-foreground/50 uppercase tracking-wider">
                Management System
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-sidebar-accent text-sidebar-foreground/60"
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {items.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  if (typeof window !== 'undefined' && window.innerWidth < 1024) onClose();
                }}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium',
                  'transition-colors group',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <item.icon
                  size={17}
                  className={cn(
                    'flex-shrink-0 transition-colors',
                    isActive ? 'text-sidebar-primary-foreground' : 'text-sidebar-foreground/50 group-hover:text-sidebar-accent-foreground',
                  )}
                />
                <span className="flex-1">{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User footer */}
        {user && (
          <div className="px-4 py-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 min-w-0">
              <Avatar name={user.name} size="sm" className="flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
                <p className="text-xs text-sidebar-foreground/50 truncate">{user.role}</p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

