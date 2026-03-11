// ─── User Types ───────────────────────────────────────────────────────────────

export interface Doctor {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  department: string;
  qualification: string;
  experience: number;
  status: 'active' | 'inactive' | 'on-leave';
  avatar?: string;
  appointmentsToday: number;
  totalPatients: number;
  joiningDate: string;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  bloodGroup: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  registrationDate: string;
  status: 'active' | 'inactive';
  assignedDoctorId?: string;
  assignedDoctorName?: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
}
