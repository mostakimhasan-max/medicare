'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { DataTable, Column } from '@/components/tables/DataTable';
import { Pagination } from '@/components/tables/Pagination';
import { StatusBadge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Staff } from '@/types';
import { MOCK_STAFF } from '@/utils/mock-data';
import { formatDate } from '@/utils/formatters';

const columns: Column<Staff>[] = [
  {
    key: 'name',
    header: 'Staff Member',
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
  { key: 'role', header: 'Role', sortable: true },
  { key: 'department', header: 'Department', sortable: true },
  { key: 'phone', header: 'Phone', render: (r) => <span className="font-mono text-xs">{r.phone}</span> },
  {
    key: 'joinDate',
    header: 'Joined',
    render: (r) => <span className="text-xs text-slate-500">{formatDate(r.joinDate)}</span>,
  },
  { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
];

export default function AdminStaffPage() {
  const [staff] = useState<Staff[]>(MOCK_STAFF);

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={staff}
        keyExtractor={(s) => s.id}
        searchable
        searchPlaceholder="Search staff…"
        emptyMessage="No staff members found."
        headerActions={
          <Button leftIcon={<Plus size={15} />} size="sm">
            Add Staff
          </Button>
        }
      />
    </div>
  );
}

