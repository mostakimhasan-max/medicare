'use client';

import { LayoutDashboard, CalendarDays, Users, ClipboardList } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SidebarItem } from '@/types';
import { usePathname } from 'next/navigation';

const sidebarItems: SidebarItem[] = [
  { label: 'Dashboard', href: '/doctor/dashboard', icon: LayoutDashboard },
  { label: 'Appointments', href: '/doctor/appointments', icon: CalendarDays },
  { label: 'Patients', href: '/doctor/patients', icon: Users },
  { label: 'Prescriptions', href: '/doctor/prescriptions', icon: ClipboardList },
];

const pageTitles: Record<string, string> = {
  '/doctor/dashboard': 'Doctor Dashboard',
  '/doctor/appointments': 'My Appointments',
  '/doctor/patients': 'My Patients',
  '/doctor/prescriptions': 'Prescriptions',
};

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <DashboardLayout sidebarItems={sidebarItems} pageTitle={pageTitles[pathname] ?? 'Doctor Panel'}>
      {children}
    </DashboardLayout>
  );
}
