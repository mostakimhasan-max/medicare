'use client';

import {
  LayoutDashboard,
  Users,
  Stethoscope,
  CalendarDays,
  CreditCard,
  Settings,
  UserCog,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SidebarItem } from '@/types';
import { usePathname } from 'next/navigation';

const sidebarItems: SidebarItem[] = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Doctors', href: '/admin/doctors', icon: Stethoscope },
  { label: 'Staff', href: '/admin/staff', icon: UserCog },
  { label: 'Patients', href: '/admin/patients', icon: Users },
  { label: 'Appointments', href: '/admin/appointments', icon: CalendarDays },
  { label: 'Billing', href: '/admin/billing', icon: CreditCard },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

const pageTitles: Record<string, string> = {
  '/admin/dashboard': 'Admin Dashboard',
  '/admin/doctors': 'Manage Doctors',
  '/admin/staff': 'Manage Staff',
  '/admin/patients': 'Manage Patients',
  '/admin/appointments': 'Appointments',
  '/admin/billing': 'Billing & Revenue',
  '/admin/settings': 'System Settings',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? 'Admin Panel';

  return (
    <DashboardLayout sidebarItems={sidebarItems} pageTitle={title}>
      {children}
    </DashboardLayout>
  );
}

