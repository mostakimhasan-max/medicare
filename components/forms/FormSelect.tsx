'use client';

import { useController, Control, FieldValues, Path } from 'react-hook-form';
import { cn } from '@/utils/cn';
import { SelectHTMLAttributes } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps<T extends FieldValues>
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'name'> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  options: SelectOption[];
  placeholder?: string;
}

export function FormSelect<T extends FieldValues>({
  name,
  control,
  label,
  options,
  placeholder,
  className,
  ...rest
}: FormSelectProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const inputId = name.toString();

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-foreground">
          {label}
          {rest.required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <select
        {...field}
        id={inputId}
        className={cn(
          'w-full h-9 rounded-lg border text-sm text-foreground bg-background px-3',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
          'disabled:bg-muted disabled:cursor-not-allowed transition-colors',
          error
            ? 'border-red-400 focus:ring-red-400'
            : 'border-input hover:border-ring',
          className,
        )}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-600">{error.message}</p>}
    </div>
  );
}

