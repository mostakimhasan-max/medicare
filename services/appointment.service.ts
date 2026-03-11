import { Appointment, CreateAppointmentDto, PaginatedResponse, QueryParams } from '@/types';
import { MOCK_APPOINTMENTS } from '@/utils/mock-data';

export const appointmentService = {
  async getAll(params?: QueryParams): Promise<PaginatedResponse<Appointment>> {
    const search = params?.search?.toLowerCase() ?? '';
    let filtered = [...MOCK_APPOINTMENTS];

    if (search) {
      filtered = filtered.filter(
        (a) =>
          a.patientName.toLowerCase().includes(search) ||
          a.doctorName.toLowerCase().includes(search),
      );
    }
    if (params?.status) {
      filtered = filtered.filter((a) => a.status === params.status);
    }
    if (params?.startDate) {
      filtered = filtered.filter((a) => a.date >= params.startDate!);
    }
    if (params?.endDate) {
      filtered = filtered.filter((a) => a.date <= params.endDate!);
    }

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

  async getById(id: string): Promise<Appointment | null> {
    return MOCK_APPOINTMENTS.find((a) => a.id === id) ?? null;
  },

  async getByPatient(patientId: string): Promise<Appointment[]> {
    return MOCK_APPOINTMENTS.filter((a) => a.patientId === patientId);
  },

  async getByDoctor(doctorId: string): Promise<Appointment[]> {
    return MOCK_APPOINTMENTS.filter((a) => a.doctorId === doctorId);
  },

  async getTodaysAppointments(): Promise<Appointment[]> {
    const today = new Date().toISOString().split('T')[0];
    return MOCK_APPOINTMENTS.filter((a) => a.date === today);
  },

  async create(data: CreateAppointmentDto): Promise<Appointment> {
    const appointment: Appointment = {
      id: `a${Date.now()}`,
      status: 'scheduled',
      duration: 30,
      patientName: '',
      doctorName: '',
      ...data,
    };
    MOCK_APPOINTMENTS.push(appointment);
    return appointment;
  },

  async updateStatus(
    id: string,
    status: Appointment['status'],
  ): Promise<Appointment> {
    const idx = MOCK_APPOINTMENTS.findIndex((a) => a.id === id);
    if (idx === -1) throw new Error('Appointment not found');
    MOCK_APPOINTMENTS[idx] = { ...MOCK_APPOINTMENTS[idx], status };
    return MOCK_APPOINTMENTS[idx];
  },
};
