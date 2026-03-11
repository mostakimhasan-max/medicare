'use client';

import { useState } from 'react';
import { MOCK_PATIENTS } from '@/utils/mock-data';
import { DataTable, Column } from '@/components/tables/DataTable';
import { StatusBadge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Patient } from '@/types';
import { formatDate, calculateAge } from '@/utils/formatters';

const columns: Column<Patient>[] = [
  {
    key: 'name',
    header: 'Patient',
    sortable: true,
    render: (row) => (
      <div className="flex items-center gap-3">
        <Avatar name={row.name} size="sm" />
        <div>
          <p className="font-medium text-slate-800">{row.name}</p>
          <p className="text-xs text-slate-400">{row.phone}</p>
        </div>
      </div>
    ),
  },
  {
    key: 'dateOfBirth',
    header: 'Age',
    render: (row) => <span>{calculateAge(row.dateOfBirth)} yrs · <span className="capitalize">{row.gender}</span></span>,
  },
  { key: 'bloodGroup', header: 'Blood' },
  { key: 'insuranceProvider', header: 'Insurance', render: (r) => <span className="text-xs">{r.insuranceProvider ?? '—'}</span> },
  {
    key: 'registrationDate',
    header: 'Since',
    render: (r) => <span className="text-xs text-slate-500">{formatDate(r.registrationDate)}</span>,
  },
  { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
];

export default function DoctorPatientsPage() {
  // In production, filter by doctor's patient list
  const patients = MOCK_PATIENTS;

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={patients}
        keyExtractor={(p) => p.id}
        searchable
        searchPlaceholder="Search patients…"
        emptyMessage="No patients assigned."
      />
    </div>
  );
}
