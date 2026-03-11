'use client';

import { useState, useEffect } from 'react';
import { DataTable, Column } from '@/components/tables/DataTable';
import { Pagination } from '@/components/tables/Pagination';
import { StatusBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Appointment } from '@/types';
import { appointmentService } from '@/services/appointment.service';
import { usePagination } from '@/hooks/usePagination';
import { formatDate, formatTime } from '@/utils/formatters';
import { Avatar } from '@/components/ui/avatar';
import { Plus } from 'lucide-react';

const columns: Column<Appointment>[] = [
  {
    key: 'patientName',
    header: 'Patient',
    sortable: true,
    render: (row) => (
      <div className="flex items-center gap-2">
        <Avatar name={row.patientName} size="xs" />
        <span className="font-medium text-slate-800">{row.patientName}</span>
      </div>
    ),
  },
  { key: 'doctorName', header: 'Doctor', sortable: true },
  { key: 'department', header: 'Department' },
  {
    key: 'date',
    header: 'Date & Time',
    sortable: true,
    render: (row) => (
      <div>
        <p className="text-sm text-slate-700">{formatDate(row.date)}</p>
        <p className="text-xs text-slate-400">{formatTime(row.time)}</p>
      </div>
    ),
  },
  {
    key: 'type',
    header: 'Type',
    render: (row) => (
      <span className="text-slate-600 capitalize text-xs">{row.type.replace(/-/g, ' ')}</span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    render: (row) => <StatusBadge status={row.status} />,
  },
];

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { page, setPage, pageSize } = usePagination();

  useEffect(() => {
    setIsLoading(true);
    appointmentService
      .getAll({ page, limit: pageSize })
      .then(({ data, total, totalPages }) => {
        setAppointments(data);
        setTotal(total);
        setTotalPages(totalPages);
      })
      .finally(() => setIsLoading(false));
  }, [page, pageSize]);

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={appointments}
        isLoading={isLoading}
        keyExtractor={(a) => a.id}
        searchable
        searchPlaceholder="Search appointments…"
        emptyMessage="No appointments found."
        headerActions={
          <Button leftIcon={<Plus size={15} />} size="sm">
            New Appointment
          </Button>
        }
      />
      <Pagination page={page} totalPages={totalPages} total={total} limit={pageSize} onPageChange={setPage} />
    </div>
  );
}

