// ─── Prescription Types ───────────────────────────────────────────────────────

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  diagnosis: string;
  symptoms: string[];
  medications: Medication[];
  notes?: string;
  followUpDate?: string;
  status: 'active' | 'completed' | 'expired';
}

export interface CreatePrescriptionDto {
  patientId: string;
  diagnosis: string;
  symptoms: string[];
  medications: Medication[];
  notes?: string;
  followUpDate?: string;
}
