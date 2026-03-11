'use client';

import { LayoutDashboard, CalendarDays, UserPlus, CreditCard } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SidebarItem } from '@/types';
import { usePathname } from 'next/navigation';

const sidebarItems: SidebarItem[] = [
  { label: 'Dashboard', href: '/staff/dashboard', icon: LayoutDashboard },
  { label: 'Appointments', href: '/staff/appointments', icon: CalendarDays },
  { label: 'Patient Registration', href: '/staff/patient-registration', icon: UserPlus },
  { label: 'Billing', href: '/staff/billing', icon: CreditCard },
];

const pageTitles: Record<string, string> = {
  '/staff/dashboard': 'Staff Dashboard',
  '/staff/appointments': 'Manage Appointments',
  '/staff/patient-registration': 'Register Patient',
  '/staff/billing': 'Billing',
};

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <DashboardLayout sidebarItems={sidebarItems} pageTitle={pageTitles[pathname] ?? 'Staff Panel'}>
      {children}
    </DashboardLayout>
  );
}
