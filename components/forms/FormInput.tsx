'use client';

import { useController, Control, FieldValues, Path } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import type { InputHTMLAttributes } from 'react';

interface FormInputProps<T extends FieldValues>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  hint,
  leftIcon,
  rightIcon,
  ...rest
}: FormInputProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <Input
      {...field}
      {...rest}
      label={label}
      hint={hint}
      error={error?.message}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
    />
  );
}

