'use client';

import { useState } from 'react';
import { DataTable, Column } from '@/components/tables/DataTable';
import { StatusBadge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Appointment } from '@/types';
import { MOCK_APPOINTMENTS } from '@/utils/mock-data';
import { formatDate, formatTime } from '@/utils/formatters';
import { Plus } from 'lucide-react';

const columns: Column<Appointment>[] = [
  {
    key: 'patientName', header: 'Patient', sortable: true,
    render: (r) => <div className="flex items-center gap-2"><Avatar name={r.patientName} size="xs" /><span className="font-medium">{r.patientName}</span></div>,
  },
  { key: 'doctorName', header: 'Doctor', sortable: true },
  { key: 'department', header: 'Dept' },
  {
    key: 'date', header: 'Date & Time', sortable: true,
    render: (r) => <div><p>{formatDate(r.date)}</p><p className="text-xs text-slate-400">{formatTime(r.time)}</p></div>,
  },
  { key: 'type', header: 'Type', render: (r) => <span className="capitalize text-xs">{r.type.replace(/-/g, ' ')}</span> },
  { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
];

export default function StaffAppointmentsPage() {
  const [appointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={appointments}
        keyExtractor={(a) => a.id}
        searchable
        searchPlaceholder="Search by patient or doctor…"
        emptyMessage="No appointments."
        headerActions={<Button leftIcon={<Plus size={15} />} size="sm">New Appointment</Button>}
      />
    </div>
  );
}

