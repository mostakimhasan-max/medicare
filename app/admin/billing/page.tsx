'use client';

import { useState, useEffect } from 'react';
import { DataTable, Column } from '@/components/tables/DataTable';
import { Pagination } from '@/components/tables/Pagination';
import { StatusBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bill } from '@/types';
import { billingService } from '@/services/billing.service';
import { usePagination } from '@/hooks/usePagination';
import { formatDate, formatCurrency } from '@/utils/formatters';
import { StatsCard } from '@/components/layout/StatsCard';
import { DollarSign, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

const columns: Column<Bill>[] = [
  { key: 'id', header: 'Bill #', render: (r) => <span className="font-mono text-xs text-muted-foreground">#{r.id.toUpperCase()}</span> },
  { key: 'patientName', header: 'Patient', sortable: true },
  {
    key: 'date',
    header: 'Bill Date',
    sortable: true,
    render: (r) => <span className="text-xs">{formatDate(r.date)}</span>,
  },
  {
    key: 'dueDate',
    header: 'Due Date',
    render: (r) => <span className="text-xs">{formatDate(r.dueDate)}</span>,
  },
  {
    key: 'total',
    header: 'Amount',
    sortable: true,
    render: (r) => (
      <span className="font-semibold text-foreground">{formatCurrency(r.total)}</span>
    ),
  },
  {
    key: 'paymentMethod',
    header: 'Payment',
    render: (r) => (
      <span className="text-xs capitalize text-muted-foreground">{r.paymentMethod ?? '—'}</span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    render: (r) => <StatusBadge status={r.status} />,
  },
];

export default function AdminBillingPage() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { page, setPage, pageSize } = usePagination();

  useEffect(() => {
    setIsLoading(true);
    billingService
      .getAll({ page, limit: pageSize })
      .then(({ data, total, totalPages }) => {
        setBills(data);
        setTotal(total);
        setTotalPages(totalPages);
      })
      .finally(() => setIsLoading(false));
  }, [page, pageSize]);

  const paidBills = bills.filter((b) => b.status === 'paid');
  const pendingBills = bills.filter((b) => b.status === 'pending');
  const overdueBills = bills.filter((b) => b.status === 'overdue');
  const totalCollected = paidBills.reduce((s, b) => s + b.total, 0);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard title="Total Revenue" value={formatCurrency(totalCollected)} icon={<DollarSign size={22} className="text-emerald-600" />} iconBg="bg-emerald-50" change={8} />
        <StatsCard title="Paid Bills" value={paidBills.length} icon={<CheckCircle size={22} className="text-blue-600" />} iconBg="bg-blue-50" />
        <StatsCard title="Pending Bills" value={pendingBills.length} icon={<TrendingUp size={22} className="text-amber-600" />} iconBg="bg-amber-50" />
        <StatsCard title="Overdue Bills" value={overdueBills.length} icon={<AlertCircle size={22} className="text-red-500" />} iconBg="bg-red-50" />
      </div>

      <DataTable
        columns={columns}
        data={bills}
        isLoading={isLoading}
        keyExtractor={(b) => b.id}
        searchable
        searchPlaceholder="Search by patient name…"
        emptyMessage="No bills found."
        headerActions={
          <Button size="sm">Generate Bill</Button>
        }
      />
      <Pagination page={page} totalPages={totalPages} total={total} limit={pageSize} onPageChange={setPage} />
    </div>
  );
}

