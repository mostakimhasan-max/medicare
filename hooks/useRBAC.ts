'use client';

import { useAuthStore } from '@/store/auth.store';
import { UserRole } from '@/types';

/**
 * RBAC hook — provides fine-grained permission helpers.
 *
 * Usage:
 *   const { can, role, isAdmin } = useRBAC();
 *   if (can('DELETE_DOCTOR')) { ... }
 */

type Permission =
  | 'VIEW_ADMIN_PANEL'
  | 'MANAGE_DOCTORS'
  | 'MANAGE_STAFF'
  | 'MANAGE_PATIENTS'
  | 'VIEW_ANALYTICS'
  | 'MANAGE_SETTINGS'
  | 'VIEW_DOCTOR_PANEL'
  | 'MANAGE_PRESCRIPTIONS'
  | 'VIEW_PATIENT_HISTORY'
  | 'VIEW_STAFF_PANEL'
  | 'REGISTER_PATIENTS'
  | 'MANAGE_BILLING'
  | 'VIEW_PATIENT_PANEL'
  | 'BOOK_APPOINTMENT'
  | 'VIEW_OWN_RECORDS';

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  ADMIN: [
    'VIEW_ADMIN_PANEL',
    'MANAGE_DOCTORS',
    'MANAGE_STAFF',
    'MANAGE_PATIENTS',
    'VIEW_ANALYTICS',
    'MANAGE_SETTINGS',
    'MANAGE_BILLING',
    'VIEW_DOCTOR_PANEL',
    'VIEW_STAFF_PANEL',
    'VIEW_PATIENT_PANEL',
  ],
  DOCTOR: [
    'VIEW_DOCTOR_PANEL',
    'MANAGE_PRESCRIPTIONS',
    'VIEW_PATIENT_HISTORY',
  ],
  STAFF: [
    'VIEW_STAFF_PANEL',
    'REGISTER_PATIENTS',
    'MANAGE_BILLING',
  ],
  PATIENT: [
    'VIEW_PATIENT_PANEL',
    'BOOK_APPOINTMENT',
    'VIEW_OWN_RECORDS',
  ],
};

export function useRBAC() {
  const { user } = useAuthStore();
  const role = user?.role ?? null;

  const can = (permission: Permission): boolean => {
    if (!role) return false;
    return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
  };

  return {
    role,
    can,
    isAdmin: role === 'ADMIN',
    isDoctor: role === 'DOCTOR',
    isStaff: role === 'STAFF',
    isPatient: role === 'PATIENT',
    isAuthenticated: !!user,
  };
}
