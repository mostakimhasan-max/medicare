'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2, ClipboardList } from 'lucide-react';
import { Card, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { MOCK_PRESCRIPTIONS } from '@/utils/mock-data';
import { Prescription } from '@/types';
import { formatDate } from '@/utils/formatters';
import { notify } from '@/store/notification.store';

const medSchema = z.object({
  name: z.string().min(1, 'Required'),
  dosage: z.string().min(1, 'Required'),
  frequency: z.string().min(1, 'Required'),
  duration: z.string().min(1, 'Required'),
  instructions: z.string().optional(),
});

const rxSchema = z.object({
  patientId: z.string().min(1, 'Select a patient'),
  diagnosis: z.string().min(3, 'Diagnosis is required'),
  symptoms: z.string().min(3, 'Enter at least one symptom'),
  medications: z.array(medSchema).min(1, 'Add at least one medication'),
  notes: z.string().optional(),
  followUpDate: z.string().optional(),
});

type RxForm = z.infer<typeof rxSchema>;

export default function DoctorPrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(MOCK_PRESCRIPTIONS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<RxForm>({
    resolver: zodResolver(rxSchema),
    defaultValues: { medications: [{ name: '', dosage: '', frequency: '', duration: '' }] },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'medications' });

  const onSubmit = async (data: RxForm) => {
    const newRx: Prescription = {
      id: `rx${Date.now()}`,
      patientId: data.patientId,
      patientName: 'New Patient',
      doctorId: 'd1',
      doctorName: 'Dr. Sarah Johnson',
      date: new Date().toISOString().split('T')[0],
      diagnosis: data.diagnosis,
      symptoms: data.symptoms.split(',').map((s) => s.trim()),
      medications: data.medications,
      notes: data.notes,
      followUpDate: data.followUpDate,
      status: 'active',
    };
    setPrescriptions((prev) => [newRx, ...prev]);
    notify.success('Prescription created', `For ${newRx.patientName}`);
    reset();
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{prescriptions.length} total prescriptions</p>
        <Button leftIcon={<Plus size={15} />} onClick={() => setIsModalOpen(true)}>
          New Prescription
        </Button>
      </div>

      {/* Prescriptions list */}
      <div className="space-y-3">
        {prescriptions.map((rx) => (
          <Card key={rx.id} className="hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-violet-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ClipboardList size={18} className="text-violet-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-slate-900">{rx.patientName}</h3>
                    <StatusBadge status={rx.status} />
                  </div>
                  <p className="text-sm text-slate-600 mt-0.5">{rx.diagnosis}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {formatDate(rx.date)}
                    {rx.followUpDate && ` · Follow-up: ${formatDate(rx.followUpDate)}`}
                  </p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs text-slate-500">{rx.medications.length} medication{rx.medications.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-50 flex flex-wrap gap-2">
              {rx.medications.map((med, i) => (
                <span key={i} className="inline-flex gap-1 items-center text-xs bg-slate-50 border border-slate-100 rounded-lg px-2 py-1">
                  <span className="font-medium text-slate-700">{med.name}</span>
                  <span className="text-slate-400">{med.dosage} · {med.frequency}</span>
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* New Prescription Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="New Prescription"
        size="xl"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button form="rx-form" type="submit" isLoading={isSubmitting}>Save Prescription</Button>
          </>
        }
      >
        <form id="rx-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-700">Patient <span className="text-red-500">*</span></label>
              <select {...register('patientId')}
                className="h-9 rounded-lg border border-slate-300 text-sm px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select patient</option>
                <option value="p1">John Smith</option>
                <option value="p2">Maria Garcia</option>
                <option value="p3">David Lee</option>
              </select>
              {errors.patientId && <p className="text-xs text-red-600">{errors.patientId.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-700">Follow-up Date</label>
              <input {...register('followUpDate')} type="date"
                className="h-9 rounded-lg border border-slate-300 text-sm px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Diagnosis <span className="text-red-500">*</span></label>
            <input {...register('diagnosis')} placeholder="e.g. Hypertension"
              className="h-9 rounded-lg border border-slate-300 text-sm px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {errors.diagnosis && <p className="text-xs text-red-600">{errors.diagnosis.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Symptoms (comma-separated)</label>
            <input {...register('symptoms')} placeholder="e.g. Headache, Fatigue, Nausea"
              className="h-9 rounded-lg border border-slate-300 text-sm px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Medications */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-slate-700">Medications <span className="text-red-500">*</span></label>
              <Button type="button" variant="ghost" size="sm" leftIcon={<Plus size={13} />}
                onClick={() => append({ name: '', dosage: '', frequency: '', duration: '' })}>
                Add
              </Button>
            </div>
            <div className="space-y-2">
              {fields.map((field, idx) => (
                <div key={field.id} className="flex gap-2 items-start p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="grid grid-cols-2 gap-2 flex-1">
                    <input {...register(`medications.${idx}.name`)} placeholder="Drug name"
                      className="h-8 rounded-lg border border-slate-200 text-xs px-2 focus:outline-none focus:ring-1 focus:ring-blue-400" />
                    <input {...register(`medications.${idx}.dosage`)} placeholder="Dosage"
                      className="h-8 rounded-lg border border-slate-200 text-xs px-2 focus:outline-none focus:ring-1 focus:ring-blue-400" />
                    <input {...register(`medications.${idx}.frequency`)} placeholder="Frequency"
                      className="h-8 rounded-lg border border-slate-200 text-xs px-2 focus:outline-none focus:ring-1 focus:ring-blue-400" />
                    <input {...register(`medications.${idx}.duration`)} placeholder="Duration"
                      className="h-8 rounded-lg border border-slate-200 text-xs px-2 focus:outline-none focus:ring-1 focus:ring-blue-400" />
                    <input {...register(`medications.${idx}.instructions`)} placeholder="Instructions (optional)"
                      className="h-8 col-span-2 rounded-lg border border-slate-200 text-xs px-2 focus:outline-none focus:ring-1 focus:ring-blue-400" />
                  </div>
                  {fields.length > 1 && (
                    <button type="button" onClick={() => remove(idx)}
                      className="p-1 text-red-400 hover:text-red-600 mt-0.5">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Notes</label>
            <textarea {...register('notes')} rows={2} placeholder="Additional notes…"
              className="rounded-lg border border-slate-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>
        </form>
      </Modal>
    </div>
  );
}
