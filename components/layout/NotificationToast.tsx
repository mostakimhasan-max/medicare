'use client';

import { useNotificationStore } from '@/store/notification.store';
import { cn } from '@/utils/cn';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const colorClasses = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-amber-50 border-amber-200 text-amber-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
};

const iconColors = {
  success: 'text-green-500',
  error: 'text-red-500',
  warning: 'text-amber-500',
  info: 'text-blue-500',
};

export function NotificationToast() {
  const { notifications, remove } = useNotificationStore();

  if (notifications.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 max-w-sm w-full"
    >
      {notifications.map((n) => {
        const Icon = icons[n.type];
        return (
          <div
            key={n.id}
            className={cn(
              'flex items-start gap-3 p-4 rounded-xl border shadow-md',
              'animate-in slide-in-from-right-5 fade-in duration-300',
              colorClasses[n.type],
            )}
            role="alert"
          >
            <Icon size={18} className={cn('flex-shrink-0 mt-0.5', iconColors[n.type])} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">{n.title}</p>
              {n.message && <p className="text-xs mt-0.5 opacity-80">{n.message}</p>}
            </div>
            <button
              onClick={() => remove(n.id)}
              className="flex-shrink-0 p-0.5 rounded hover:opacity-70"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

