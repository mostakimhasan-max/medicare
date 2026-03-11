'use client';

import { useState } from 'react';
import { MOCK_APPOINTMENTS } from '@/utils/mock-data';
import { DataTable, Column } from '@/components/tables/DataTable';
import { StatusBadge } from '@/components/ui/badge';
import { Appointment } from '@/types';
import { formatDate, formatTime } from '@/utils/formatters';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const myAppointments = MOCK_APPOINTMENTS.filter((a) => a.patientId === 'p1');

const columns: Column<Appointment>[] = [
  { key: 'doctorName', header: 'Doctor', sortable: true },
  { key: 'department', header: 'Department' },
  {
    key: 'date', header: 'Date & Time', sortable: true,
    render: (r) => <div><p>{formatDate(r.date)}</p><p className="text-xs text-muted-foreground">{formatTime(r.time)}</p></div>,
  },
  { key: 'type', header: 'Type', render: (r) => <span className="capitalize text-xs">{r.type.replace(/-/g, ' ')}</span> },
  { key: 'room', header: 'Room', render: (r) => <span className="text-xs">{r.room ?? '—'}</span> },
  { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
];

export default function PatientAppointmentsPage() {
  const [appointments] = useState(myAppointments);
  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={appointments}
        keyExtractor={(a) => a.id}
        searchable
        searchPlaceholder="Search appointments…"
        emptyMessage="No appointments found."
        headerActions={<Button leftIcon={<Plus size={15} />} size="sm">Book Appointment</Button>}
      />
    </div>
  );
}

