'use client';

import { useState, useEffect } from 'react';
import { Plus, Stethoscope } from 'lucide-react';
import { DataTable, Column } from '@/components/tables/DataTable';
import { Pagination } from '@/components/tables/Pagination';
import { StatusBadge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { doctorService } from '@/services/doctor.service';
import { Doctor } from '@/types';
import { usePagination } from '@/hooks/usePagination';
import { useDebounce } from '@/hooks/useDebounce';
import { formatDate } from '@/utils/formatters';

const columns: Column<Doctor>[] = [
  {
    key: 'name',
    header: 'Doctor',
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
    key: 'specialization',
    header: 'Specialization',
    sortable: true,
    render: (row) => (
      <div>
        <p className="text-slate-700">{row.specialization}</p>
        <p className="text-xs text-slate-400">{row.department}</p>
      </div>
    ),
  },
  { key: 'qualification', header: 'Qualification', sortable: true },
  {
    key: 'experience',
    header: 'Experience',
    render: (row) => <span>{row.experience} yrs</span>,
  },
  {
    key: 'appointmentsToday',
    header: "Today's Apts",
    render: (row) => (
      <span className="font-semibold text-blue-600">{row.appointmentsToday}</span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    render: (row) => <StatusBadge status={row.status} />,
  },
  {
    key: 'joiningDate',
    header: 'Joined',
    render: (row) => <span className="text-slate-500 text-xs">{formatDate(row.joiningDate)}</span>,
  },
];

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const debouncedSearch = useDebounce(search);
  const { page, setPage, pageSize } = usePagination();

  useEffect(() => {
    setIsLoading(true);
    doctorService
      .getAll({ page, limit: pageSize, search: debouncedSearch })
      .then(({ data, total, totalPages }) => {
        setDoctors(data);
        setTotal(total);
        setTotalPages(totalPages);
      })
      .finally(() => setIsLoading(false));
  }, [page, pageSize, debouncedSearch]);

  return (
    <div className="space-y-4">
      {/* Summary strip */}
      <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
          <Stethoscope size={20} className="text-blue-600" />
        </div>
        <div>
          <p className="font-semibold text-slate-900">{total} doctors registered</p>
          <p className="text-xs text-slate-500">Across all departments</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={doctors}
        isLoading={isLoading}
        keyExtractor={(d) => d.id}
        searchable
        searchPlaceholder="Search by name or specialization…"
        emptyMessage="No doctors found."
        headerActions={
          <Button leftIcon={<Plus size={15} />} size="sm">
            Add Doctor
          </Button>
        }
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        total={total}
        limit={pageSize}
        onPageChange={setPage}
      />
    </div>
  );
}
