import { Patient, PaginatedResponse, QueryParams } from '@/types';
import { MOCK_PATIENTS } from '@/utils/mock-data';

export const patientService = {
  async getAll(params?: QueryParams): Promise<PaginatedResponse<Patient>> {
    const search = params?.search?.toLowerCase() ?? '';
    const filtered = MOCK_PATIENTS.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.email.toLowerCase().includes(search) ||
        p.phone.includes(search),
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

  async getById(id: string): Promise<Patient | null> {
    return MOCK_PATIENTS.find((p) => p.id === id) ?? null;
  },

  async create(data: Partial<Patient>): Promise<Patient> {
    const patient: Patient = {
      id: `p${Date.now()}`,
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'active',
      ...data,
    } as Patient;
    MOCK_PATIENTS.push(patient);
    return patient;
  },

  async update(id: string, data: Partial<Patient>): Promise<Patient> {
    const idx = MOCK_PATIENTS.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error('Patient not found');
    MOCK_PATIENTS[idx] = { ...MOCK_PATIENTS[idx], ...data };
    return MOCK_PATIENTS[idx];
  },

  async delete(id: string): Promise<void> {
    const idx = MOCK_PATIENTS.findIndex((p) => p.id === id);
    if (idx !== -1) MOCK_PATIENTS.splice(idx, 1);
  },
};
