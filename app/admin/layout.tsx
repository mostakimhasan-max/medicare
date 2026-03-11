'use client';

import {
  LayoutDashboard,
  Users,
  CalendarDays,
  MessageSquare,
  Video,
  Pill,
  FlaskConical,
  BedDouble,
  FileText,
  Receipt,
  Package,
  UserCog,
  Share2,
  Building2,
  BarChart3,
  Brain,
  ScanLine,
  BookOpen,
  ShieldCheck,
  Bell,
  ScrollText,
  Settings,
  Lock,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SidebarItem } from '@/types';
import { usePathname } from 'next/navigation';

const sidebarItems: SidebarItem[] = [
  // Clinical
  { label: 'Dashboard',          href: '/admin/dashboard',          icon: LayoutDashboard, group: 'Clinical' },
  { label: 'Patients',           href: '/admin/patients',            icon: Users,           group: 'Clinical' },
  { label: 'Appointments',       href: '/admin/appointments',        icon: CalendarDays,    group: 'Clinical' },
  { label: 'Consultations',      href: '/admin/consultations',       icon: MessageSquare,   group: 'Clinical' },
  { label: 'Live Consultation',  href: '/admin/consultations/live',  icon: Video,           group: 'Clinical' },
  { label: 'Prescriptions',      href: '/admin/prescriptions',       icon: Pill,            group: 'Clinical' },
  { label: 'Lab Orders',         href: '/admin/lab-orders',          icon: FlaskConical,    group: 'Clinical' },
  { label: 'Admissions',         href: '/admin/admissions',          icon: BedDouble,       group: 'Clinical' },
  { label: 'Documents',          href: '/admin/documents',           icon: FileText,        group: 'Clinical' },

  // Operations
  { label: 'Invoices',           href: '/admin/billing',             icon: Receipt,         group: 'Operations' },
  { label: 'Inventory',          href: '/admin/inventory',           icon: Package,         group: 'Operations' },
  { label: 'Users & Staff',      href: '/admin/staff',               icon: UserCog,         group: 'Operations' },
  { label: 'Referrals',          href: '/admin/referrals',           icon: Share2,          group: 'Operations' },
  { label: 'Organizations',      href: '/admin/organizations',       icon: Building2,       group: 'Operations' },

  // Intelligence
  { label: 'Reports',            href: '/admin/reports',             icon: BarChart3,       group: 'Intelligence' },
  { label: 'AI Sessions',        href: '/admin/ai-sessions',         icon: Brain,           group: 'Intelligence' },
  { label: 'Imaging Lab',        href: '/admin/imaging',             icon: ScanLine,        group: 'Intelligence' },
  { label: 'Research Assistant', href: '/admin/research',            icon: BookOpen,        group: 'Intelligence' },
  { label: 'Safety & OCR',       href: '/admin/safety',              icon: ShieldCheck,     group: 'Intelligence' },

  // System
  { label: 'Notifications',      href: '/admin/notifications',       icon: Bell,     badge: 3, group: 'System' },
  { label: 'Audit Logs',         href: '/admin/audit-logs',          icon: ScrollText,      group: 'System' },
  { label: 'Settings',           href: '/admin/settings',            icon: Settings,        group: 'System' },
  { label: 'Permissions',        href: '/admin/permissions',         icon: Lock,            group: 'System' },
];

const pageTitles: Record<string, string> = {
  '/admin/dashboard':         'Admin Dashboard',
  '/admin/patients':          'Patients',
  '/admin/appointments':      'Appointments',
  '/admin/consultations':     'Consultations',
  '/admin/consultations/live':'Live Consultation',
  '/admin/prescriptions':     'Prescriptions',
  '/admin/lab-orders':        'Lab Orders',
  '/admin/admissions':        'Admissions',
  '/admin/documents':         'Documents',
  '/admin/billing':           'Invoices & Billing',
  '/admin/inventory':         'Inventory',
  '/admin/staff':             'Users & Staff',
  '/admin/referrals':         'Referrals',
  '/admin/organizations':     'Organizations',
  '/admin/reports':           'Reports',
  '/admin/ai-sessions':       'AI Sessions',
  '/admin/imaging':           'Imaging Lab',
  '/admin/research':          'Research Assistant',
  '/admin/safety':            'Safety & OCR',
  '/admin/notifications':     'Notifications',
  '/admin/audit-logs':        'Audit Logs',
  '/admin/settings':          'System Settings',
  '/admin/permissions':       'Permissions',
  '/admin/doctors':           'Manage Doctors',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? 'Admin Panel';

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      pageTitle={title}
      sidebarAction="New Consultation"
    >
      {children}
    </DashboardLayout>
  );
}

