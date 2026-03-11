'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, HeartPulse, Plus } from 'lucide-react';
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

  // Build flat render list: inject group headers before the first item of each group
  type NavEntry =
    | { type: 'header'; label: string; first: boolean }
    | { type: 'item'; item: SidebarItem };

  const navEntries: NavEntry[] = [];
  const seenGroups = new Set<string>();
  for (const item of items) {
    if (item.group && !seenGroups.has(item.group)) {
      seenGroups.add(item.group);
      navEntries.push({ type: 'header', label: item.group, first: seenGroups.size === 1 });
    }
    navEntries.push({ type: 'item', item });
  }

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
          'fixed inset-y-0 left-0 z-30 w-64 flex flex-col flex-shrink-0',
          'bg-sidebar text-sidebar-foreground border-r border-sidebar-border',
          'transition-transform duration-300 ease-in-out',
          'lg:relative lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-[1.1rem] border-b border-sidebar-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
              <HeartPulse size={20} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-base leading-none text-sidebar-foreground">Medicare</h1>
              <p className="text-[11px] text-sidebar-foreground/50 mt-0.5 tracking-wide">
                Management System
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground/50 transition-colors"
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-3 overflow-y-auto space-y-0.5">
          {navEntries.map((entry, idx) => {
            if (entry.type === 'header') {
              return (
                <p
                  key={`h-${entry.label}`}
                  className={cn(
                    'px-3 pb-1 text-[10px] uppercase tracking-widest font-bold text-sidebar-foreground/40',
                    idx === 0 ? 'pt-1' : 'pt-5',
                  )}
                >
                  {entry.label}
                </p>
              );
            }

            const { item } = entry;
            const isActive =
              pathname === item.href ||
              (item.href.length > 1 && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  if (typeof window !== 'undefined' && window.innerWidth < 1024) onClose();
                }}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors group',
                  isActive
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <item.icon
                  size={16}
                  className={cn(
                    'flex-shrink-0 transition-colors',
                    isActive
                      ? 'text-primary'
                      : 'text-sidebar-foreground/40 group-hover:text-sidebar-accent-foreground',
                  )}
                />
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="bg-red-100 text-red-700 dark:bg-red-900/60 dark:text-red-300 text-[10px] font-bold rounded-full px-1.5 py-0.5 leading-none">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User footer */}
        {user && (
          <div className="px-4 py-4 border-t border-sidebar-border flex-shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <Avatar name={user.name} size="sm" className="flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-sidebar-foreground truncate">{user.name}</p>
                <p className="text-[11px] text-sidebar-foreground/50 truncate capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
