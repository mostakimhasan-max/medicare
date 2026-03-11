import { Prescription, CreatePrescriptionDto, PaginatedResponse, QueryParams } from '@/types';
import { MOCK_PRESCRIPTIONS } from '@/utils/mock-data';

export const prescriptionService = {
  async getAll(params?: QueryParams): Promise<PaginatedResponse<Prescription>> {
    const search = params?.search?.toLowerCase() ?? '';
    const filtered = MOCK_PRESCRIPTIONS.filter(
      (rx) =>
        rx.patientName.toLowerCase().includes(search) ||
        rx.diagnosis.toLowerCase().includes(search),
    );
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;
    return {
      data: filtered.slice((page - 1) * limit, page * limit),
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit),
    };
  },

  async getByPatient(patientId: string): Promise<Prescription[]> {
    return MOCK_PRESCRIPTIONS.filter((rx) => rx.patientId === patientId);
  },

  async getByDoctor(doctorId: string): Promise<Prescription[]> {
    return MOCK_PRESCRIPTIONS.filter((rx) => rx.doctorId === doctorId);
  },

  async getById(id: string): Promise<Prescription | null> {
    return MOCK_PRESCRIPTIONS.find((rx) => rx.id === id) ?? null;
  },

  async create(
    doctorId: string,
    doctorName: string,
    data: CreatePrescriptionDto,
  ): Promise<Prescription> {
    const prescription: Prescription = {
      id: `rx${Date.now()}`,
      doctorId,
      doctorName,
      patientName: '',
      date: new Date().toISOString().split('T')[0],
      status: 'active',
      ...data,
    };
    MOCK_PRESCRIPTIONS.push(prescription);
    return prescription;
  },
};
