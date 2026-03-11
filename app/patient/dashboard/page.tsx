import { CalendarDays, ClipboardList, CreditCard, FileText } from 'lucide-react';
import { StatsCard } from '@/components/layout/StatsCard';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/Badge';
import { formatDate, formatTime, formatCurrency } from '@/utils/formatters';
import { MOCK_APPOINTMENTS, MOCK_PRESCRIPTIONS, MOCK_BILLS } from '@/utils/mock-data';

// Filter demo data for patient p1
const myAppointments = MOCK_APPOINTMENTS.filter((a) => a.patientId === 'p1');
const myPrescriptions = MOCK_PRESCRIPTIONS.filter((rx) => rx.patientId === 'p1');
const myBills = MOCK_BILLS.filter((b) => b.patientId === 'p1');

const upcomingAppts = myAppointments.filter(
  (a) => a.status === 'scheduled' || a.status === 'in-progress',
);

export default function PatientDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard title="Upcoming Appointments" value={upcomingAppts.length} icon={<CalendarDays size={22} className="text-blue-600" />} iconBg="bg-blue-50" />
        <StatsCard title="Active Prescriptions" value={myPrescriptions.filter((rx) => rx.status === 'active').length} icon={<ClipboardList size={22} className="text-violet-600" />} iconBg="bg-violet-50" />
        <StatsCard title="Pending Bills" value={myBills.filter((b) => b.status === 'pending').length} icon={<CreditCard size={22} className="text-amber-600" />} iconBg="bg-amber-50" />
        <StatsCard title="Medical Records" value="8" icon={<FileText size={22} className="text-emerald-600" />} iconBg="bg-emerald-50" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Upcoming appointments */}
        <Card padding="none">
          <CardHeader className="px-5 pt-5 pb-3">
            <CardTitle>Upcoming Appointments</CardTitle>
            <a href="/patient/appointments" className="text-xs text-blue-600 hover:underline">View all</a>
          </CardHeader>
          {upcomingAppts.length === 0 ? (
            <p className="px-5 pb-5 text-sm text-slate-400">No upcoming appointments.</p>
          ) : (
            <div className="divide-y divide-slate-50">
              {upcomingAppts.map((a) => (
                <div key={a.id} className="px-5 py-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-base font-bold text-blue-600">
                      {new Date(a.date).getDate()}
                    </span>
                    <span className="text-[10px] text-blue-400 uppercase font-medium">
                      {new Date(a.date).toLocaleString('en-US', { month: 'short' })}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-slate-800">{a.doctorName}</p>
                    <p className="text-xs text-slate-500">{a.department} · {formatTime(a.time)}</p>
                    <p className="text-xs text-slate-400 capitalize mt-0.5">{a.type.replace(/-/g, ' ')}</p>
                  </div>
                  <StatusBadge status={a.status} />
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Recent prescriptions */}
        <Card padding="none">
          <CardHeader className="px-5 pt-5 pb-3">
            <CardTitle>My Prescriptions</CardTitle>
            <a href="/patient/prescriptions" className="text-xs text-blue-600 hover:underline">View all</a>
          </CardHeader>
          {myPrescriptions.length === 0 ? (
            <p className="px-5 pb-5 text-sm text-slate-400">No prescriptions yet.</p>
          ) : (
            <div className="divide-y divide-slate-50">
              {myPrescriptions.map((rx) => (
                <div key={rx.id} className="px-5 py-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold text-sm text-slate-800">{rx.diagnosis}</p>
                      <p className="text-xs text-slate-500">{rx.doctorName} · {formatDate(rx.date)}</p>
                    </div>
                    <StatusBadge status={rx.status} />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {rx.medications.map((med, i) => (
                      <span key={i} className="text-[10px] bg-slate-50 border border-slate-100 rounded-md px-1.5 py-0.5 text-slate-600">
                        {med.name} {med.dosage}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Bills */}
      {myBills.length > 0 && (
        <Card padding="none">
          <CardHeader className="px-5 pt-5 pb-3">
            <CardTitle>Recent Bills</CardTitle>
            <a href="/patient/billing" className="text-xs text-blue-600 hover:underline">View all</a>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-y border-slate-100 bg-slate-50">
                  {['Invoice', 'Date', 'Due Date', 'Amount', 'Status'].map((h) => (
                    <th key={h} className="px-5 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {myBills.map((b) => (
                  <tr key={b.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                    <td className="px-5 py-3 font-mono text-xs">#{b.id.toUpperCase()}</td>
                    <td className="px-5 py-3 text-xs text-slate-500">{formatDate(b.date)}</td>
                    <td className="px-5 py-3 text-xs text-slate-500">{formatDate(b.dueDate)}</td>
                    <td className="px-5 py-3 font-semibold">{formatCurrency(b.total)}</td>
                    <td className="px-5 py-3"><StatusBadge status={b.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
