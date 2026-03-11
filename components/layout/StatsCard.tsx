import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/utils/cn';

const ICON_BG_DARK: Record<string, string> = {
  'bg-blue-50':    'dark:bg-blue-950/50',
  'bg-emerald-50': 'dark:bg-emerald-950/50',
  'bg-amber-50':   'dark:bg-amber-950/50',
  'bg-violet-50':  'dark:bg-violet-950/50',
  'bg-rose-50':    'dark:bg-rose-950/50',
  'bg-cyan-50':    'dark:bg-cyan-950/50',
  'bg-orange-50':  'dark:bg-orange-950/50',
  'bg-red-50':     'dark:bg-red-950/50',
  'bg-green-50':   'dark:bg-green-950/50',
  'bg-purple-50':  'dark:bg-purple-950/50',
};

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
        'bg-card rounded-xl border border-border shadow-sm p-5 flex flex-col gap-4',
        className,
      )}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center', iconBg, ICON_BG_DARK[iconBg])}>
          {icon}
        </div>
        {change !== undefined && (
          <div
            className={cn(
              'flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full',
              isPositive
                ? 'bg-green-50 text-green-600 dark:bg-green-950/50 dark:text-green-400'
                : 'bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400',
            )}
          >
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>

      {/* Value & title */}
      <div>
        <p className="text-2xl font-bold text-card-foreground leading-none">{value}</p>
        <p className="text-sm text-muted-foreground mt-1.5">{title}</p>
        {changeLabel && (
          <p className="text-xs text-muted-foreground/70 mt-0.5">{changeLabel}</p>
        )}
      </div>
    </div>
  );
}

