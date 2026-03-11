import { UserRole } from '@/types';

// ─── Roles ────────────────────────────────────────────────────────────────────

export const ROLES = {
  ADMIN: 'ADMIN' as UserRole,
  DOCTOR: 'DOCTOR' as UserRole,
  STAFF: 'STAFF' as UserRole,
  PATIENT: 'PATIENT' as UserRole,
} as const;

export const ROLE_REDIRECTS: Record<UserRole, string> = {
  ADMIN: '/admin/dashboard',
  DOCTOR: '/doctor/dashboard',
  STAFF: '/staff/dashboard',
  PATIENT: '/patient/dashboard',
};

export const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: 'Administrator',
  DOCTOR: 'Doctor',
  STAFF: 'Staff Member',
  PATIENT: 'Patient',
};

// ─── Status colors (Tailwind classes) ────────────────────────────────────────

export const APPOINTMENT_STATUS_COLORS: Record<string, string> = {
  scheduled: 'bg-blue-100 text-blue-700 border-blue-200',
  'in-progress': 'bg-amber-100 text-amber-700 border-amber-200',
  completed: 'bg-green-100 text-green-700 border-green-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
  'no-show': 'bg-slate-100 text-slate-600 border-slate-200',
};

export const BILL_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  paid: 'bg-green-100 text-green-700 border-green-200',
  overdue: 'bg-red-100 text-red-700 border-red-200',
  cancelled: 'bg-slate-100 text-slate-600 border-slate-200',
};

export const USER_STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-100 text-green-700 border-green-200',
  inactive: 'bg-slate-100 text-slate-600 border-slate-200',
  'on-leave': 'bg-amber-100 text-amber-700 border-amber-200',
};

export const PRESCRIPTION_STATUS_COLORS: Record<string, string> = {
  active: 'bg-blue-100 text-blue-700 border-blue-200',
  completed: 'bg-green-100 text-green-700 border-green-200',
  expired: 'bg-slate-100 text-slate-600 border-slate-200',
};

// ─── Pagination ───────────────────────────────────────────────────────────────

export const ITEMS_PER_PAGE = 10;

// ─── Departments ──────────────────────────────────────────────────────────────

export const DEPARTMENTS = [
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Oncology',
  'Radiology',
  'Emergency',
  'General Medicine',
  'Dermatology',
  'Ophthalmology',
  'ENT',
  'Gynecology',
  'Urology',
  'Psychiatry',
  'Gastroenterology',
] as const;

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const;
