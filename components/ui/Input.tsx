import * as React from "react"

import { cn } from "@/lib/utils"

const INPUT_BASE =
  "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  wrapperClassName?: string;
}

function Input({
  className,
  type,
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  wrapperClassName,
  id,
  ...props
}: InputProps) {
  const inputEl = (
    <input
      type={type}
      id={id}
      data-slot="input"
      className={cn(
        INPUT_BASE,
        leftIcon && "pl-9",
        rightIcon && "pr-9",
        error && "border-destructive focus-visible:ring-destructive/30",
        className
      )}
      {...props}
    />
  );

  if (!label && !error && !hint && !leftIcon && !rightIcon) {
    return inputEl;
  }

  return (
    <div className={cn("space-y-1.5", wrapperClassName)}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none text-foreground"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground [&_svg]:size-4">
            {leftIcon}
          </span>
        )}
        {inputEl}
        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground [&_svg]:size-4">
            {rightIcon}
          </span>
        )}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export { Input }

