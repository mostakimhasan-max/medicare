"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

// ─── Shadcn Radix primitives ─────────────────────────────────────────────────

function AvatarRoot({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: "default" | "sm" | "lg"
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs",
        className
      )}
      {...props}
    />
  )
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-background select-none",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        className
      )}
      {...props}
    />
  )
}

// ─── High-level Avatar ───────────────────────────────────────────────────────
// Accepts name (shows initials with deterministic color) or src (image).
// Compatible with both the old custom component API and shadcn composition.

const AVATAR_COLORS = [
  'bg-blue-500',   'bg-violet-500', 'bg-pink-500',   'bg-rose-500',
  'bg-orange-500', 'bg-amber-500',  'bg-yellow-500', 'bg-green-500',
  'bg-teal-500',   'bg-cyan-500',   'bg-sky-500',    'bg-indigo-500',
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

function getColorClass(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

const SIZE_CLASS: Record<string, string> = {
  xs:      'size-5  text-xs',
  sm:      'size-6  text-xs',
  default: 'size-8  text-sm',
  md:      'size-9  text-sm',
  lg:      'size-10 text-sm',
  xl:      'size-14 text-base',
};

function Avatar({
  name,
  src,
  alt,
  size = 'default',
  className,
}: {
  name?: string;
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'default' | 'md' | 'lg' | 'xl';
  className?: string;
}) {
  const initials = name ? getInitials(name) : '?';
  const colorClass = name ? getColorClass(name) : 'bg-muted';
  const sizeClass = SIZE_CLASS[size] ?? SIZE_CLASS.default;

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full select-none',
        sizeClass,
        className
      )}
    >
      {src && (
        <AvatarPrimitive.Image
          src={src}
          alt={alt ?? name}
          className="aspect-square size-full"
        />
      )}
      <AvatarPrimitive.Fallback
        className={cn(
          'flex size-full items-center justify-center rounded-full font-semibold text-white',
          colorClass
        )}
      >
        {initials}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}

export {
  Avatar,
  AvatarRoot,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
}

