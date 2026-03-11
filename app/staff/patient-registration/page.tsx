'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { patientService } from '@/services/patient.service';
import { notify } from '@/store/notification.store';
import { DEPARTMENTS, BLOOD_GROUPS } from '@/utils/constants';

const schema = z.object({
  name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(7, 'Enter a valid phone number'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female', 'other']),
  bloodGroup: z.string().min(1, 'Select blood group'),
  address: z.string().min(5, 'Address is required'),
  emergencyContact: z.string().min(2, 'Emergency contact name is required'),
  emergencyPhone: z.string().min(7, 'Emergency phone is required'),
  insuranceProvider: z.string().optional(),
  insuranceNumber: z.string().optional(),
});

type RegistrationForm = z.infer<typeof schema>;

export default function PatientRegistrationPage() {
  const [registered, setRegistered] = useState(false);
  const [patientId, setPatientId] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationForm>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: RegistrationForm) => {
    const patient = await patientService.create(data);
    setPatientId(patient.id);
    setRegistered(true);
    notify.success('Patient registered!', `ID: ${patient.id}`);
  };

  if (registered) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle size={36} className="text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Patient Registered!</h2>
        <p className="text-muted-foreground text-sm">Patient ID: <span className="font-mono font-bold">{patientId}</span></p>
        <div className="flex gap-3 mt-2">
          <Button variant="outline" onClick={() => { setRegistered(false); reset(); }}>
            Register Another
          </Button>
          <Button onClick={() => window.location.href = '/staff/dashboard'}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const fieldClass = 'h-9 rounded-lg border border-input bg-background text-foreground text-sm px-3 focus:outline-none focus:ring-2 focus:ring-ring w-full';
  const labelClass = 'text-sm font-medium text-foreground';
  const errClass = 'text-xs text-red-600 mt-0.5';

  return (
    <div className="max-w-3xl space-y-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Personal info */}
        <Card>
          <CardTitle className="mb-4">Personal Information</CardTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 flex flex-col gap-1">
              <label className={labelClass}>Full Name <span className="text-red-500">*</span></label>
              <input {...register('name')} placeholder="John Doe" className={fieldClass} />
              {errors.name && <p className={errClass}>{errors.name.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Email <span className="text-red-500">*</span></label>
              <input {...register('email')} type="email" placeholder="john@email.com" className={fieldClass} />
              {errors.email && <p className={errClass}>{errors.email.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Phone <span className="text-red-500">*</span></label>
              <input {...register('phone')} placeholder="(555) 000-0000" className={fieldClass} />
              {errors.phone && <p className={errClass}>{errors.phone.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Date of Birth <span className="text-red-500">*</span></label>
              <input {...register('dateOfBirth')} type="date" className={fieldClass} />
              {errors.dateOfBirth && <p className={errClass}>{errors.dateOfBirth.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Gender <span className="text-red-500">*</span></label>
              <select {...register('gender')} className={fieldClass}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Blood Group <span className="text-red-500">*</span></label>
              <select {...register('bloodGroup')} className={fieldClass}>
                <option value="">Select</option>
                {BLOOD_GROUPS.map((bg) => <option key={bg} value={bg}>{bg}</option>)}
              </select>
              {errors.bloodGroup && <p className={errClass}>{errors.bloodGroup.message}</p>}
            </div>
            <div className="sm:col-span-2 flex flex-col gap-1">
              <label className={labelClass}>Address <span className="text-red-500">*</span></label>
              <input {...register('address')} placeholder="123 Main St, City, State" className={fieldClass} />
              {errors.address && <p className={errClass}>{errors.address.message}</p>}
            </div>
          </div>
        </Card>

        {/* Emergency contact */}
        <Card>
          <CardTitle className="mb-4">Emergency Contact</CardTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Contact Name <span className="text-red-500">*</span></label>
              <input {...register('emergencyContact')} placeholder="Jane Doe" className={fieldClass} />
              {errors.emergencyContact && <p className={errClass}>{errors.emergencyContact.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Contact Phone <span className="text-red-500">*</span></label>
              <input {...register('emergencyPhone')} placeholder="(555) 000-0001" className={fieldClass} />
              {errors.emergencyPhone && <p className={errClass}>{errors.emergencyPhone.message}</p>}
            </div>
          </div>
        </Card>

        {/* Insurance */}
        <Card>
          <CardTitle className="mb-4">Insurance (Optional)</CardTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Insurance Provider</label>
              <input {...register('insuranceProvider')} placeholder="e.g. BlueCross" className={fieldClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Policy Number</label>
              <input {...register('insuranceNumber')} placeholder="BC-123456" className={fieldClass} />
            </div>
          </div>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => reset()}>Reset</Button>
          <Button type="submit" loading={isSubmitting}>Register Patient</Button>
        </div>
      </form>
    </div>
  );
}

