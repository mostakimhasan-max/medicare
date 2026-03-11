import { CalendarDays, Users, ClipboardList, Clock } from 'lucide-react';
import { StatsCard } from '@/components/layout/StatsCard';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { formatTime } from '@/utils/formatters';
import { MOCK_APPOINTMENTS, MOCK_PATIENTS } from '@/utils/mock-data';

// Filter for the demo doctor (id: d1)
const todaysAppointments = MOCK_APPOINTMENTS.filter(
  (a) => a.doctorId === 'd1',
).slice(0, 5);

export default function DoctorDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard title="Appointments Today" value="8" icon={<CalendarDays size={22} className="text-blue-600" />} iconBg="bg-blue-50" change={3} />
        <StatsCard title="Total Patients" value="142" icon={<Users size={22} className="text-emerald-600" />} iconBg="bg-emerald-50" change={5} />
        <StatsCard title="Prescriptions This Week" value="24" icon={<ClipboardList size={22} className="text-violet-600" />} iconBg="bg-violet-50" />
        <StatsCard title="Pending Reports" value="3" icon={<Clock size={22} className="text-amber-600" />} iconBg="bg-amber-50" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Today's schedule */}
        <Card className="xl:col-span-2 py-0 gap-0">
          <CardHeader className="px-5 pt-5 pb-3">
            <CardTitle>Today's Schedule</CardTitle>
            <a href="/doctor/appointments" className="text-xs text-blue-600 hover:underline">View all</a>
          </CardHeader>
          <div className="divide-y divide-border/40">
            {todaysAppointments.map((appt) => (
              <div key={appt.id} className="flex items-center gap-4 px-5 py-3 hover:bg-muted/40">
                <div className="text-center w-12 flex-shrink-0">
                  <p className="text-sm font-bold text-foreground">{formatTime(appt.time)}</p>
                  <p className="text-[10px] text-muted-foreground">{appt.duration}min</p>
                </div>
                <div className="w-px h-8 bg-muted" />
                <Avatar name={appt.patientName} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm truncate">{appt.patientName}</p>
                  <p className="text-xs text-muted-foreground capitalize">{appt.type.replace(/-/g, ' ')}</p>
                </div>
                <StatusBadge status={appt.status} />
              </div>
            ))}
          </div>
        </Card>

        {/* Recent patients */}
        <Card className="py-0 gap-0">
          <CardHeader className="px-5 pt-5 pb-3">
            <CardTitle>Recent Patients</CardTitle>
          </CardHeader>
          <div className="px-5 pb-5 space-y-3">
            {MOCK_PATIENTS.slice(0, 5).map((patient) => (
              <div key={patient.id} className="flex items-center gap-3">
                <Avatar name={patient.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{patient.name}</p>
                  <p className="text-xs text-muted-foreground">{patient.bloodGroup} · {patient.gender}</p>
                </div>
                <StatusBadge status={patient.status} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}


