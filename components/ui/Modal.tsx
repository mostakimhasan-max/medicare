'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
};

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  size = 'md',
  children,
  footer,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  // Close on backdrop click
  const handleClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) onClose();
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      onClick={handleClick}
      className={cn(
        'fixed inset-0 z-50 m-auto rounded-xl shadow-2xl border border-slate-200',
        'backdrop:bg-black/50 backdrop:backdrop-blur-sm',
        'p-0 w-full',
        sizeClasses[size],
        'open:flex open:flex-col',
      )}
    >
      {/* Header */}
      {(title || description) && (
        <div className="flex items-start justify-between p-5 border-b border-slate-100">
          <div>
            {title && (
              <h3 className="text-base font-semibold text-slate-900">{title}</h3>
            )}
            {description && (
              <p className="mt-1 text-sm text-slate-500">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Body */}
      <div className="p-5 flex-1 overflow-y-auto">{children}</div>

      {/* Footer */}
      {footer && (
        <div className="flex items-center justify-end gap-3 p-5 border-t border-slate-100 bg-slate-50 rounded-b-xl">
          {footer}
        </div>
      )}
    </dialog>
  );
}

