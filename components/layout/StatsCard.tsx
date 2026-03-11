import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/utils/cn';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg: string;
  change?: number;
  changeLabel?: string;
  className?: string;
}

export function StatsCard({
  title,
  value,
  icon,
  iconBg,
  change,
  changeLabel,
  className,
}: StatsCardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-slate-100 shadow-sm p-5 flex flex-col gap-4',
        className,
      )}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center', iconBg)}>
          {icon}
        </div>
        {change !== undefined && (
          <div
            className={cn(
              'flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full',
              isPositive
                ? 'bg-green-50 text-green-600'
                : 'bg-red-50 text-red-600',
            )}
          >
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>

      {/* Value & title */}
      <div>
        <p className="text-2xl font-bold text-slate-900 leading-none">{value}</p>
        <p className="text-sm text-slate-500 mt-1.5">{title}</p>
        {changeLabel && (
          <p className="text-xs text-slate-400 mt-0.5">{changeLabel}</p>
        )}
      </div>
    </div>
  );
}

