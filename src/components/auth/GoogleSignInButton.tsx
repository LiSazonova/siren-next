'use client';

import Image from 'next/image';

type Props = {
  label: string;
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

export default function GoogleSignInButton({
  label,
  loading,
  disabled,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="inline-flex w-full items-center justify-center gap-3 h-[48px] text-[16px] uppercase text-black bg-white rounded-md border border-neutral-200 hover:border-black disabled:opacity-60 transition"
    >
      <Image
        src="/Icons/google.svg"
        alt=""
        width={24}
        height={24}
        aria-hidden
      />
      <span>{label}</span>
    </button>
  );
}
