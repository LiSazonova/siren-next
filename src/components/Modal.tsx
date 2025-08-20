'use client';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  closeOnBackdrop?: boolean;
  showClose?: boolean;
  className?: string; // если нужно переопределить стили карточки
};

const sizeMap = {
  sm: 'w-[300px] max-w-[90vw]',
  md: 'w-[520px] max-w-[92vw]',
  lg: 'w-[720px] max-w-[94vw]',
};

export default function Modal({
  isOpen,
  onClose,
  children,
  size = 'sm',
  closeOnBackdrop = true,
  showClose = true,
  className = '',
}: ModalProps) {
  // Закрытие по ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Блокируем скролл body
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const content = (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      {/* фон */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => closeOnBackdrop && onClose()}
      />
      {/* карточка */}
      <div
        className={[
          'relative bg-white border border-black p-6 text-center',
          'shadow-[0_0_0_1px_#000] animate-in fade-in zoom-in-95 duration-150',
          sizeMap[size],
          className,
        ].join(' ')}
      >
        {showClose && (
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="absolute -right-3 -top-3 h-8 w-8 flex items-center justify-center bg-white border border-black"
          >
            ✕
          </button>
        )}
        {children}
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
