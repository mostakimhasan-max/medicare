import { cn } from '@/utils/cn';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-3',
  lg: 'w-12 h-12 border-4',
};

export function Spinner({ size = 'md', className, label = 'Loading…' }: SpinnerProps) {
  return (
    <div
      role="status"
      className={cn('inline-flex flex-col items-center gap-2', className)}
    >
      <div
        className={cn(
          'rounded-full border-slate-200 border-t-blue-600 animate-spin',
          sizeClasses[size],
        )}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function PageSpinner() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-64">
      <Spinner size="lg" />
    </div>
  );
}

