'use client';

import { useState, useEffect } from 'react';
import { DataTable, Column } from '@/components/tables/DataTable';
import { StatusBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bill } from '@/types';
import { billingService } from '@/services/billing.service';
import { formatDate, formatCurrency } from '@/utils/formatters';
import { CheckCircle, Plus } from 'lucide-react';
import { notify } from '@/store/notification.store';

const columns: Column<Bill>[] = [
  { key: 'id', header: 'Invoice', render: (r) => <span className="font-mono text-xs">#{r.id.toUpperCase()}</span> },
  { key: 'patientName', header: 'Patient', sortable: true },
  { key: 'date', header: 'Date', render: (r) => <span className="text-xs">{formatDate(r.date)}</span> },
  { key: 'dueDate', header: 'Due', render: (r) => <span className="text-xs">{formatDate(r.dueDate)}</span> },
  { key: 'total', header: 'Amount', sortable: true, render: (r) => <span className="font-semibold">{formatCurrency(r.total)}</span> },
  { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  {
    key: 'id',
    header: 'Action',
    render: (row) =>
      row.status === 'pending' || row.status === 'overdue' ? (
        <Button
          size="sm"
          variant="outline"
          leftIcon={<CheckCircle size={13} />}
          onClick={() => {
            billingService.markPaid(row.id, 'cash');
            notify.success('Payment recorded', `Bill #${row.id.toUpperCase()} marked as paid`);
          }}
        >
          Mark Paid
        </Button>
      ) : null,
  },
];

export default function StaffBillingPage() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    billingService.getAll().then(({ data }) => setBills(data)).finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={bills}
        isLoading={isLoading}
        keyExtractor={(b) => b.id}
        searchable
        searchPlaceholder="Search bills…"
        headerActions={<Button leftIcon={<Plus size={15} />} size="sm">New Bill</Button>}
      />
    </div>
  );
}

