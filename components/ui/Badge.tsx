import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90",
        outline:
          "border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        ghost: "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        link: "text-primary underline-offset-4 [a&]:hover:underline",
        success:
          "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
        warning:
          "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300",
        info:
          "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

// ─── StatusBadge ─────────────────────────────────────────────────────────────
// Maps entity status strings to styled Badge variants.

const STATUS_CLASS_MAP: Record<string, string> = {
  // Appointments
  scheduled:     'border-sky-200    bg-sky-50    text-sky-700    dark:border-sky-800    dark:bg-sky-950    dark:text-sky-300',
  confirmed:     'border-blue-200   bg-blue-50   text-blue-700   dark:border-blue-800   dark:bg-blue-950   dark:text-blue-300',
  'in-progress': 'border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300',
  completed:     'border-slate-200  bg-slate-100 text-slate-600  dark:border-slate-700  dark:bg-slate-800  dark:text-slate-300',
  cancelled:     'border-red-200    bg-red-50    text-red-700    dark:border-red-800    dark:bg-red-950    dark:text-red-300',
  'no-show':     'border-red-200    bg-red-50    text-red-700    dark:border-red-800    dark:bg-red-950    dark:text-red-300',
  // Users / doctors
  active:        'border-green-200  bg-green-50  text-green-700  dark:border-green-800  dark:bg-green-950  dark:text-green-300',
  inactive:      'border-slate-200  bg-slate-100 text-slate-500  dark:border-slate-700  dark:bg-slate-800  dark:text-slate-400',
  'on-leave':    'border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300',
  // Billing
  pending:       'border-amber-200  bg-amber-50  text-amber-700  dark:border-amber-800  dark:bg-amber-950  dark:text-amber-300',
  paid:          'border-green-200  bg-green-50  text-green-700  dark:border-green-800  dark:bg-green-950  dark:text-green-300',
  overdue:       'border-red-200    bg-red-50    text-red-700    dark:border-red-800    dark:bg-red-950    dark:text-red-300',
  // Prescriptions
  expired:       'border-slate-200  bg-slate-100 text-slate-500  dark:border-slate-700  dark:bg-slate-800  dark:text-slate-400',
};

function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const statusClass =
    STATUS_CLASS_MAP[status] ??
    'border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300';
  return (
    <Badge
      variant="outline"
      className={cn('capitalize', statusClass, className)}
    >
      {status.replace(/-/g, ' ')}
    </Badge>
  );
}

export { Badge, badgeVariants, StatusBadge }

