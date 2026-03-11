'use client';

import { create } from 'zustand';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number; // ms, default 4000
}

interface NotificationState {
  notifications: Notification[];
  add: (n: Omit<Notification, 'id'>) => void;
  remove: (id: string) => void;
  clear: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],

  add: (n) => {
    const id = Math.random().toString(36).slice(2);
    const notification: Notification = { id, duration: 4000, ...n };
    set((state) => ({ notifications: [...state.notifications, notification] }));

    // Auto-dismiss
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((x) => x.id !== id),
      }));
    }, notification.duration);
  },

  remove: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  clear: () => set({ notifications: [] }),
}));

// ─── Convenience helpers ──────────────────────────────────────────────────────

export const notify = {
  success: (title: string, message?: string) =>
    useNotificationStore.getState().add({ type: 'success', title, message }),
  error: (title: string, message?: string) =>
    useNotificationStore.getState().add({ type: 'error', title, message }),
  warning: (title: string, message?: string) =>
    useNotificationStore.getState().add({ type: 'warning', title, message }),
  info: (title: string, message?: string) =>
    useNotificationStore.getState().add({ type: 'info', title, message }),
};
