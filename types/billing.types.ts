// ─── Billing Types ────────────────────────────────────────────────────────────

export type BillStatus = 'pending' | 'paid' | 'overdue' | 'cancelled';
export type PaymentMethod = 'cash' | 'card' | 'insurance' | 'online';

export interface BillItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Bill {
  id: string;
  patientId: string;
  patientName: string;
  appointmentId?: string;
  date: string;
  dueDate: string;
  items: BillItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: BillStatus;
  paymentMethod?: PaymentMethod;
  paidDate?: string;
  notes?: string;
}

export interface CreateBillDto {
  patientId: string;
  appointmentId?: string;
  dueDate: string;
  items: BillItem[];
  discount?: number;
  notes?: string;
}
