'use client';

import { MOCK_PRESCRIPTIONS } from '@/utils/mock-data';
import { StatusBadge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { formatDate } from '@/utils/formatters';
import { Pill, CalendarCheck } from 'lucide-react';

const myPrescriptions = MOCK_PRESCRIPTIONS.filter((p) => p.patientId === 'p1');

export default function PatientPrescriptionsPage() {
  return (
    <div className="space-y-4">
      {myPrescriptions.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">No prescriptions found.</div>
      )}
      {myPrescriptions.map((rx) => (
        <Card key={rx.id}>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar name={rx.doctorName} size="md" />
                <div>
                  <CardTitle className="text-base">{rx.doctorName}</CardTitle>
                  <p className="text-xs text-muted-foreground">{rx.diagnosis}</p>
                </div>
              </div>
              <StatusBadge status={rx.status} />
            </div>
          </CardHeader>
          <div className="px-4 pb-4 space-y-3">
            <div className="flex flex-wrap gap-2">
              {rx.medications.map((med, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300">
                  <Pill size={11} />
                  {med.name} {med.dosage} — {med.frequency} × {med.duration}
                </span>
              ))}
            </div>
            {rx.notes && <p className="text-xs text-muted-foreground italic">"{rx.notes}"</p>}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>Issued: {formatDate(rx.date)}</span>
              {rx.followUpDate && (
                <span className="flex items-center gap-1">
                  <CalendarCheck size={12} />
                  Follow-up: {formatDate(rx.followUpDate)}
                </span>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

