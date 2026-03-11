'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { DataTable, Column } from '@/components/tables/DataTable';
import { Pagination } from '@/components/tables/Pagination';
import { StatusBadge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Patient } from '@/types';
import { patientService } from '@/services/patient.service';
import { usePagination } from '@/hooks/usePagination';
import { useDebounce } from '@/hooks/useDebounce';
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
          <p className="text-xs text-slate-500">{row.email}</p>
        </div>
      </div>
    ),
  },
  {
    key: 'dateOfBirth',
    header: 'Age / Gender',
    render: (row) => (
      <div>
        <p className="text-slate-700">{calculateAge(row.dateOfBirth)} yrs</p>
        <p className="text-xs text-slate-400 capitalize">{row.gender}</p>
      </div>
    ),
  },
  { key: 'bloodGroup', header: 'Blood Group' },
  { key: 'phone', header: 'Phone', render: (row) => <span className="text-slate-600 font-mono text-xs">{row.phone}</span> },
  {
    key: 'assignedDoctorName',
    header: 'Assigned Doctor',
    render: (row) => (
      <span className="text-slate-600 text-xs">{row.assignedDoctorName ?? '—'}</span>
    ),
  },
  {
    key: 'registrationDate',
    header: 'Registered',
    render: (row) => <span className="text-slate-500 text-xs">{formatDate(row.registrationDate)}</span>,
  },
  {
    key: 'status',
    header: 'Status',
    render: (row) => <StatusBadge status={row.status} />,
  },
];

export default function AdminPatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { page, setPage, pageSize } = usePagination();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    setIsLoading(true);
    patientService
      .getAll({ page, limit: pageSize, search: debouncedSearch })
      .then(({ data, total, totalPages }) => {
        setPatients(data);
        setTotal(total);
        setTotalPages(totalPages);
      })
      .finally(() => setIsLoading(false));
  }, [page, pageSize, debouncedSearch]);

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={patients}
        isLoading={isLoading}
        keyExtractor={(p) => p.id}
        searchable
        searchPlaceholder="Search by name, email, or phone…"
        emptyMessage="No patients found."
        headerActions={
          <Button leftIcon={<Plus size={15} />} size="sm">
            Register Patient
          </Button>
        }
      />
      <Pagination page={page} totalPages={totalPages} total={total} limit={pageSize} onPageChange={setPage} />
    </div>
  );
}

