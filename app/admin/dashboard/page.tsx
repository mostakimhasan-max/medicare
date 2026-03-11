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
                <tr className="border-y border-border bg-muted/40">
                  {['Patient', 'Doctor', 'Date', 'Type', 'Status'].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide"
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
                    className="border-b border-border/40 last:border-0 hover:bg-muted/40"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar name={appt.patientName} size="xs" />
                        <span className="font-medium text-foreground">{appt.patientName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{appt.doctorName}</td>
                    <td className="px-5 py-3 text-muted-foreground text-xs">
                      {formatDate(appt.date)}<br />
                      <span className="text-muted-foreground">{formatTime(appt.time)}</span>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground capitalize">
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
            <TrendingUp size={16} className="text-muted-foreground" />
          </CardHeader>
          <div className="px-5 pt-4 pb-5 space-y-4">
            {MOCK_DOCTORS.filter((d) => d.status === 'active').map((doc, i) => (
              <div key={doc.id} className="flex items-center gap-3">
                <span className="text-xs font-bold text-muted-foreground w-4">{i + 1}</span>
                <Avatar name={doc.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{doc.specialization}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-foreground">
                    {doc.totalPatients}
                  </p>
                  <p className="text-[10px] text-muted-foreground">patients</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 bg-rose-50 dark:bg-rose-950/50 rounded-xl flex items-center justify-center flex-shrink-0">
            <ClipboardList size={22} className="text-rose-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">156</p>
            <p className="text-sm text-muted-foreground">Prescriptions This Week</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 bg-cyan-50 dark:bg-cyan-950/50 rounded-xl flex items-center justify-center flex-shrink-0">
            <DollarSign size={22} className="text-cyan-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">23</p>
            <p className="text-sm text-muted-foreground">Pending Bills</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-50 dark:bg-orange-950/50 rounded-xl flex items-center justify-center flex-shrink-0">
            <Users size={22} className="text-orange-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">12</p>
            <p className="text-sm text-muted-foreground">New Registrations Today</p>
          </div>
        </Card>
      </div>
    </div>
  );
}


