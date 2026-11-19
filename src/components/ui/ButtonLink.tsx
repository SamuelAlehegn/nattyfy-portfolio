import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'outline';
type ButtonSize = 'md' | 'lg';

interface ButtonLinkProps {
  to: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  ariaLabel?: string;
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-sm font-semibold whitespace-nowrap transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-button active:translate-x-0 active:translate-y-0 active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-on-primary hover:bg-highlight hover:text-on-highlight',
  outline:
    'border-2 border-heading text-heading hover:border-heading hover:bg-heading hover:text-header dark:border-accent dark:text-accent dark:hover:border-highlight dark:hover:bg-highlight dark:hover:text-on-highlight',
};

const sizes: Record<ButtonSize, string> = {
  md: 'min-h-14 min-w-[13rem] px-8 text-button-lg md:min-w-[14.375rem]',
  lg: 'min-h-14 min-w-[16rem] rounded-md px-8 text-button-lg md:min-h-16 md:min-w-[18.125rem]',
};

export function ButtonLink({
  to,
  children,
  variant = 'primary',
  size = 'md',
  className,
  ariaLabel,
}: ButtonLinkProps) {
  return (
    <Link
      to={to}
      aria-label={ariaLabel}
      className={[baseClasses, variants[variant], sizes[size], className].filter(Boolean).join(' ')}
    >
      {children}
    </Link>
  );
}
