'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MOCK_PATIENTS } from '@/utils/mock-data';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusBadge } from '@/components/ui/badge';
import { formatDate } from '@/utils/formatters';
import { Edit, Save, X } from 'lucide-react';

const me = MOCK_PATIENTS[0]; // John Smith (p1)

const profileSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(6, 'Phone is required'),
  address: z.string().min(5, 'Address is required'),
  emergencyContact: z.string().min(2, 'Emergency contact name is required'),
  emergencyPhone: z.string().min(6, 'Emergency phone is required'),
});

type ProfileForm = z.infer<typeof profileSchema>;

export default function PatientProfilePage() {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: me.name,
      email: me.email,
      phone: me.phone,
      address: me.address,
      emergencyContact: me.emergencyContact,
      emergencyPhone: me.emergencyPhone,
    },
  });

  const onSubmit = (_data: ProfileForm) => {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => {
    reset();
    setEditing(false);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Identity card */}
      <Card>
        <div className="p-5 flex items-center gap-4">
          <Avatar name={me.name} size="lg" />
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-foreground text-lg">{me.name}</h2>
            <p className="text-sm text-muted-foreground">Patient ID: {me.id.toUpperCase()}</p>
            <p className="text-sm text-muted-foreground">Registered: {formatDate(me.registrationDate)}</p>
          </div>
          <StatusBadge status={me.status} />
        </div>
        <div className="px-5 pb-4 grid grid-cols-2 gap-3 text-sm border-t border-border pt-3">
          <div><span className="text-muted-foreground">DOB:</span> <span className="font-medium">{formatDate(me.dateOfBirth)}</span></div>
          <div><span className="text-muted-foreground">Gender:</span> <span className="font-medium capitalize">{me.gender}</span></div>
          <div><span className="text-muted-foreground">Blood Group:</span> <span className="font-medium">{me.bloodGroup}</span></div>
          <div><span className="text-muted-foreground">Assigned Doctor:</span> <span className="font-medium">{me.assignedDoctorName ?? '—'}</span></div>
          {me.insuranceProvider && (
            <>
              <div><span className="text-muted-foreground">Insurance:</span> <span className="font-medium">{me.insuranceProvider}</span></div>
              <div><span className="text-muted-foreground">Policy #:</span> <span className="font-medium">{me.insuranceNumber}</span></div>
            </>
          )}
        </div>
      </Card>

      {/* Editable info */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Contact Information</CardTitle>
            {!editing && (
              <Button variant="outline" size="sm" leftIcon={<Edit size={14} />} onClick={() => setEditing(true)}>
                Edit
              </Button>
            )}
          </div>
        </CardHeader>
        {saved && (
          <div className="mx-4 mb-2 rounded-md bg-green-50 dark:bg-green-950/50 px-3 py-2 text-sm text-green-700 dark:text-green-300">
            Profile updated successfully.
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="px-4 pb-4 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input id="name" label="Full Name" {...register('name')} error={errors.name?.message} disabled={!editing} />
            <Input id="email" label="Email" type="email" {...register('email')} error={errors.email?.message} disabled={!editing} />
            <Input id="phone" label="Phone" {...register('phone')} error={errors.phone?.message} disabled={!editing} />
            <Input id="address" label="Address" {...register('address')} error={errors.address?.message} disabled={!editing} />
          </div>

          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pt-2">Emergency Contact</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input id="emergencyContact" label="Contact Name" {...register('emergencyContact')} error={errors.emergencyContact?.message} disabled={!editing} />
            <Input id="emergencyPhone" label="Contact Phone" {...register('emergencyPhone')} error={errors.emergencyPhone?.message} disabled={!editing} />
          </div>

          {editing && (
            <div className="flex gap-2 pt-2">
              <Button type="submit" size="sm" leftIcon={<Save size={14} />}>Save Changes</Button>
              <Button type="button" variant="outline" size="sm" leftIcon={<X size={14} />} onClick={handleCancel}>Cancel</Button>
            </div>
          )}
        </form>
      </Card>
    </div>
  );
}

