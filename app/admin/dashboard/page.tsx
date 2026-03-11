import {
  Users,
  Stethoscope,
  CalendarDays,
  DollarSign,
  ClipboardList,
  TrendingUp,
} from 'lucide-react';
import { StatsCard } from '@/components/layout/StatsCard';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { formatDate, formatTime, formatCurrency } from '@/utils/formatters';
import { MOCK_APPOINTMENTS, MOCK_DOCTORS } from '@/utils/mock-data';

// Recent appointments — show most recent 5
const recentAppointments = MOCK_APPOINTMENTS.slice(0, 5);

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard
          title="Total Patients"
          value="1,247"
          icon={<Users size={22} className="text-blue-600" />}
          iconBg="bg-blue-50"
          change={12}
          changeLabel="vs. last month"
        />
        <StatsCard
          title="Appointments Today"
          value="48"
          icon={<CalendarDays size={22} className="text-emerald-600" />}
          iconBg="bg-emerald-50"
          change={5}
          changeLabel="vs. yesterday"
        />
        <StatsCard
          title="Monthly Revenue"
          value={formatCurrency(124580)}
          icon={<DollarSign size={22} className="text-amber-600" />}
          iconBg="bg-amber-50"
          change={8}
          changeLabel="vs. last month"
        />
        <StatsCard
          title="Active Doctors"
          value="24"
          icon={<Stethoscope size={22} className="text-violet-600" />}
          iconBg="bg-violet-50"
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent appointments (2/3 width) */}
        <Card className="xl:col-span-2 py-0 gap-0">
          <CardHeader className="px-5 pt-5 pb-0 mb-0">
            <CardTitle>Recent Appointments</CardTitle>
            <a href="/admin/appointments" className="text-xs text-blue-600 hover:underline">
              View all
            </a>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm mt-4">
              <thead>
                <tr className="border-y border-slate-100 bg-slate-50">
                  {['Patient', 'Doctor', 'Date', 'Type', 'Status'].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentAppointments.map((appt) => (
                  <tr
                    key={appt.id}
                    className="border-b border-slate-50 last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar name={appt.patientName} size="xs" />
                        <span className="font-medium text-slate-800">{appt.patientName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-slate-600">{appt.doctorName}</td>
                    <td className="px-5 py-3 text-slate-500 text-xs">
                      {formatDate(appt.date)}<br />
                      <span className="text-slate-400">{formatTime(appt.time)}</span>
                    </td>
                    <td className="px-5 py-3 text-slate-600 capitalize">
                      {appt.type.replace(/-/g, ' ')}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={appt.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Top doctors (1/3 width) */}
        <Card className="py-0 gap-0">
          <CardHeader className="px-5 pt-5 pb-0 mb-0">
            <CardTitle>Top Doctors</CardTitle>
            <TrendingUp size={16} className="text-slate-400" />
          </CardHeader>
          <div className="px-5 pt-4 pb-5 space-y-4">
            {MOCK_DOCTORS.filter((d) => d.status === 'active').map((doc, i) => (
              <div key={doc.id} className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400 w-4">{i + 1}</span>
                <Avatar name={doc.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{doc.name}</p>
                  <p className="text-xs text-slate-500">{doc.specialization}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-slate-800">
                    {doc.totalPatients}
                  </p>
                  <p className="text-[10px] text-slate-400">patients</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <ClipboardList size={22} className="text-rose-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">156</p>
            <p className="text-sm text-slate-500">Prescriptions This Week</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <DollarSign size={22} className="text-cyan-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">23</p>
            <p className="text-sm text-slate-500">Pending Bills</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <Users size={22} className="text-orange-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">12</p>
            <p className="text-sm text-slate-500">New Registrations Today</p>
          </div>
        </Card>
      </div>
    </div>
  );
}


