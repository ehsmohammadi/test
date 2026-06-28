import type { ReactNode } from 'react';

type Variant = 'num' | 'op' | 'fn' | 'clear' | 'eq';

interface Props {
  children: ReactNode;
  onClick: () => void;
  variant?: Variant;
  wide?: boolean;
  disabled?: boolean;
}

export function CalcButton({ children, onClick, variant = 'num', wide, disabled }: Props) {
  return (
    <button
      className={`calc-btn btn-${variant}${wide ? ' wide' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
