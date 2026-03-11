import { Bill, CreateBillDto, PaginatedResponse, QueryParams } from '@/types';
import { MOCK_BILLS } from '@/utils/mock-data';

const TAX_RATE = 0.1;

export const billingService = {
  async getAll(params?: QueryParams): Promise<PaginatedResponse<Bill>> {
    const search = params?.search?.toLowerCase() ?? '';
    let filtered = [...MOCK_BILLS];

    if (search) {
      filtered = filtered.filter((b) =>
        b.patientName.toLowerCase().includes(search),
      );
    }
    if (params?.status) {
      filtered = filtered.filter((b) => b.status === params.status);
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

  async getByPatient(patientId: string): Promise<Bill[]> {
    return MOCK_BILLS.filter((b) => b.patientId === patientId);
  },

  async getById(id: string): Promise<Bill | null> {
    return MOCK_BILLS.find((b) => b.id === id) ?? null;
  },

  async create(data: CreateBillDto): Promise<Bill> {
    const subtotal = data.items.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * TAX_RATE;
    const discount = data.discount ?? 0;

    const bill: Bill = {
      id: `b${Date.now()}`,
      patientName: '',
      date: new Date().toISOString().split('T')[0],
      subtotal,
      tax,
      discount,
      total: subtotal + tax - discount,
      status: 'pending',
      ...data,
    };
    MOCK_BILLS.push(bill);
    return bill;
  },

  async markPaid(id: string, paymentMethod: Bill['paymentMethod']): Promise<Bill> {
    const idx = MOCK_BILLS.findIndex((b) => b.id === id);
    if (idx === -1) throw new Error('Bill not found');
    MOCK_BILLS[idx] = {
      ...MOCK_BILLS[idx],
      status: 'paid',
      paymentMethod,
      paidDate: new Date().toISOString().split('T')[0],
    };
    return MOCK_BILLS[idx];
  },

  async getTotalRevenue(): Promise<number> {
    return MOCK_BILLS.filter((b) => b.status === 'paid').reduce(
      (sum, b) => sum + b.total,
      0,
    );
  },
};
