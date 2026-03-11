import apiClient from './api/axios';
import { Doctor, PaginatedResponse, QueryParams } from '@/types';
import { MOCK_DOCTORS } from '@/utils/mock-data';

// ─── Doctor Service ───────────────────────────────────────────────────────────
// In production, replace mock returns with real apiClient calls.

export const doctorService = {
  async getAll(params?: QueryParams): Promise<PaginatedResponse<Doctor>> {
    // Production: return apiClient.get('/doctors', { params }).then(r => r.data);
    const search = params?.search?.toLowerCase() ?? '';
    const filtered = MOCK_DOCTORS.filter(
      (d) =>
        d.name.toLowerCase().includes(search) ||
        d.specialization.toLowerCase().includes(search) ||
        d.department.toLowerCase().includes(search),
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

  async getById(id: string): Promise<Doctor | null> {
    return MOCK_DOCTORS.find((d) => d.id === id) ?? null;
  },

  async create(data: Partial<Doctor>): Promise<Doctor> {
    // Production: return apiClient.post('/doctors', data).then(r => r.data.data);
    const doctor: Doctor = {
      id: `d${Date.now()}`,
      appointmentsToday: 0,
      totalPatients: 0,
      ...data,
    } as Doctor;
    MOCK_DOCTORS.push(doctor);
    return doctor;
  },

  async update(id: string, data: Partial<Doctor>): Promise<Doctor> {
    const idx = MOCK_DOCTORS.findIndex((d) => d.id === id);
    if (idx === -1) throw new Error('Doctor not found');
    MOCK_DOCTORS[idx] = { ...MOCK_DOCTORS[idx], ...data };
    return MOCK_DOCTORS[idx];
  },

  async delete(id: string): Promise<void> {
    const idx = MOCK_DOCTORS.findIndex((d) => d.id === id);
    if (idx !== -1) MOCK_DOCTORS.splice(idx, 1);
  },
};
