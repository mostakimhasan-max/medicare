// ─── Appointment Types ────────────────────────────────────────────────────────

export type AppointmentStatus =
  | 'scheduled'
  | 'in-progress'
  | 'completed'
  | 'cancelled'
  | 'no-show';

export type AppointmentType =
  | 'consultation'
  | 'follow-up'
  | 'emergency'
  | 'routine-checkup'
  | 'telemedicine';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  duration: number; // minutes
  type: AppointmentType;
  status: AppointmentStatus;
  notes?: string;
  department: string;
  room?: string;
}

export interface CreateAppointmentDto {
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  type: AppointmentType;
  notes?: string;
  department: string;
}
