'use client';

import { MOCK_BILLS } from '@/utils/mock-data';
import { StatusBadge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatDate, formatCurrency } from '@/utils/formatters';
import { Download, CreditCard } from 'lucide-react';

const myBills = MOCK_BILLS.filter((b) => b.patientId === 'p1');

export default function PatientBillingPage() {
  return (
    <div className="space-y-4">
      {myBills.length === 0 && (
        <div className="text-center py-16 text-slate-400">No billing records found.</div>
      )}
      {myBills.map((bill) => (
        <Card key={bill.id} className="p-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="space-y-1">
              <p className="font-semibold text-slate-800">Invoice #{bill.id.toUpperCase()}</p>
              <p className="text-xs text-slate-400">Date: {formatDate(bill.date)} · Due: {formatDate(bill.dueDate)}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-lg font-bold text-slate-800">{formatCurrency(bill.total)}</p>
              <StatusBadge status={bill.status} />
            </div>
          </div>

          {/* Line items */}
          <div className="mt-3 space-y-1">
            {bill.items.map((item, i) => (
              <div key={i} className="flex justify-between text-xs text-slate-500">
                <span>{item.description} × {item.quantity}</span>
                <span>{formatCurrency(item.total)}</span>
              </div>
            ))}
            {bill.discount > 0 && (
              <div className="flex justify-between text-xs text-green-600">
                <span>Discount</span>
                <span>-{formatCurrency(bill.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-xs text-slate-400 pt-1 border-t border-slate-100">
              <span>Tax</span>
              <span>{formatCurrency(bill.tax)}</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2 justify-end">
            <Button variant="outline" size="sm" leftIcon={<Download size={14} />}>
              Download
            </Button>
            {(bill.status === 'pending' || bill.status === 'overdue') && (
              <Button size="sm" leftIcon={<CreditCard size={14} />}>
                Pay Now
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}

