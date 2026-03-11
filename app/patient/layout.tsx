'use client';

import { LayoutDashboard, CalendarDays, ClipboardList, CreditCard, User } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SidebarItem } from '@/types';
import { usePathname } from 'next/navigation';

const sidebarItems: SidebarItem[] = [
  { label: 'Dashboard', href: '/patient/dashboard', icon: LayoutDashboard },
  { label: 'Appointments', href: '/patient/appointments', icon: CalendarDays },
  { label: 'Prescriptions', href: '/patient/prescriptions', icon: ClipboardList },
  { label: 'Billing', href: '/patient/billing', icon: CreditCard },
  { label: 'My Profile', href: '/patient/profile', icon: User },
];

const pageTitles: Record<string, string> = {
  '/patient/dashboard': 'My Dashboard',
  '/patient/appointments': 'My Appointments',
  '/patient/prescriptions': 'My Prescriptions',
  '/patient/billing': 'My Bills',
  '/patient/profile': 'My Profile',
};

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <DashboardLayout sidebarItems={sidebarItems} pageTitle={pageTitles[pathname] ?? 'Patient Portal'}>
      {children}
    </DashboardLayout>
  );
}
