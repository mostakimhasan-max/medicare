'use client';

import { useState, useEffect } from 'react';
import { DataTable, Column } from '@/components/tables/DataTable';
import { StatusBadge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Appointment } from '@/types';
import { appointmentService } from '@/services/appointment.service';
import { formatDate, formatTime } from '@/utils/formatters';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { notify } from '@/store/notification.store';

const columns: Column<Appointment>[] = [
  {
    key: 'patientName',
    header: 'Patient',
    sortable: true,
    render: (row) => (
      <div className="flex items-center gap-2">
        <Avatar name={row.patientName} size="xs" />
        <span className="font-medium">{row.patientName}</span>
      </div>
    ),
  },
  {
    key: 'date',
    header: 'Date & Time',
    sortable: true,
    render: (row) => (
      <div>
        <p>{formatDate(row.date)}</p>
        <p className="text-xs text-slate-400">{formatTime(row.time)} · {row.duration}min</p>
      </div>
    ),
  },
  { key: 'type', header: 'Type', render: (r) => <span className="capitalize text-xs">{r.type.replace(/-/g, ' ')}</span> },
  { key: 'room', header: 'Room', render: (r) => <span>{r.room ?? '—'}</span> },
  { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  {
    key: 'id',
    header: 'Actions',
    render: (row) => (
      <div className="flex items-center gap-1">
        <button
          onClick={() => {
            appointmentService.updateStatus(row.id, 'completed');
            notify.success('Appointment marked as completed');
          }}
          className="p-1.5 rounded-lg hover:bg-green-50 text-green-600"
          title="Mark completed"
        >
          <CheckCircle size={16} />
        </button>
        <button
          onClick={() => {
            appointmentService.updateStatus(row.id, 'cancelled');
            notify.info('Appointment cancelled');
          }}
          className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"
          title="Cancel"
        >
          <XCircle size={16} />
        </button>
      </div>
    ),
  },
];

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    appointmentService
      .getByDoctor('d1') // logged-in doctor id
      .then(setAppointments)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(['all', 'scheduled', 'in-progress', 'completed'] as const).map((status) => (
          <Button key={status} variant="outline" size="sm" className="capitalize">
            {status === 'all' ? 'All' : status.replace(/-/g, ' ')}
          </Button>
        ))}
      </div>
      <DataTable
        columns={columns}
        data={appointments}
        isLoading={isLoading}
        keyExtractor={(a) => a.id}
        searchable
        emptyMessage="No appointments found."
      />
    </div>
  );
}
