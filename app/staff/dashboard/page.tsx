import { Users, CalendarDays, CreditCard, Clock } from 'lucide-react';
import { StatsCard } from '@/components/layout/StatsCard';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { formatTime } from '@/utils/formatters';
import { MOCK_APPOINTMENTS } from '@/utils/mock-data';

const todaysAppts = MOCK_APPOINTMENTS.filter(
  (a) => a.status === 'scheduled' || a.status === 'in-progress',
);

export default function StaffDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard title="Registered Today" value="12" icon={<Users size={22} className="text-blue-600" />} iconBg="bg-blue-50" change={4} />
        <StatsCard title="Appointments Scheduled" value="36" icon={<CalendarDays size={22} className="text-emerald-600" />} iconBg="bg-emerald-50" change={-2} />
        <StatsCard title="Bills Generated" value="18" icon={<CreditCard size={22} className="text-violet-600" />} iconBg="bg-violet-50" />
        <StatsCard title="Pending Approvals" value="5" icon={<Clock size={22} className="text-amber-600" />} iconBg="bg-amber-50" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Queue */}
        <Card className="py-0 gap-0">
          <CardHeader className="px-5 pt-5 pb-3">
            <CardTitle>Today's Queue</CardTitle>
            <span className="text-xs text-blue-600">{todaysAppts.length} waiting</span>
          </CardHeader>
          <div className="divide-y divide-border/40">
            {todaysAppts.map((a, i) => (
              <div key={a.id} className="flex items-center gap-4 px-5 py-3 hover:bg-muted/40">
                <span className="w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <Avatar name={a.patientName} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">{a.patientName}</p>
                  <p className="text-xs text-muted-foreground">{a.doctorName}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-foreground">{formatTime(a.time)}</p>
                  <StatusBadge status={a.status} />
                </div>
              </div>
            ))}
            {todaysAppts.length === 0 && (
              <p className="px-5 py-6 text-sm text-muted-foreground text-center">Queue is empty</p>
            )}
          </div>
        </Card>

        {/* Quick actions */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">Quick Actions</p>
          {[
            { title: 'Register New Patient', desc: 'Add a new patient to the system', href: '/staff/patient-registration', color: 'bg-blue-50 border-blue-100 hover:bg-blue-100 dark:bg-blue-950/40 dark:border-blue-900 dark:hover:bg-blue-950/70' },
            { title: 'Schedule Appointment', desc: 'Book a new appointment slot', href: '/staff/appointments', color: 'bg-emerald-50 border-emerald-100 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-900 dark:hover:bg-emerald-950/70' },
            { title: 'Generate Bill', desc: 'Create an invoice for a patient', href: '/staff/billing', color: 'bg-violet-50 border-violet-100 hover:bg-violet-100 dark:bg-violet-950/40 dark:border-violet-900 dark:hover:bg-violet-950/70' },
          ].map((action) => (
            <a key={action.href} href={action.href}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-colors cursor-pointer ${action.color}`}>
              <div className="flex-1">
                <p className="font-semibold text-foreground text-sm">{action.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{action.desc}</p>
              </div>
              <span className="text-muted-foreground text-lg">›</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}


