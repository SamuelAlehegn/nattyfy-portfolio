import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';

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
  'inline-flex items-center justify-center gap-1.5 rounded-sm font-semibold whitespace-nowrap transition-[background-color,color,transform,translate] duration-300 ease-out hover:scale-[1.02] hover:-translate-y-0.5 active:translate-y-[3px] active:scale-100 active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-on-primary hover:bg-highlight hover:text-on-highlight',
  outline:
    'border-2 border-heading text-heading hover:border-heading hover:bg-heading hover:text-header dark:border-accent dark:text-accent dark:hover:border-highlight dark:hover:bg-highlight dark:hover:text-on-highlight',
};

const sizes: Record<ButtonSize, string> = {
  md: 'min-h-11 min-w-[10.4rem] px-6 text-button-lg md:min-w-[11.5rem]',
  lg: 'min-h-11 min-w-[12.8rem] rounded-md px-6 text-button-lg md:min-h-13 md:min-w-[14.5rem]',
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
      className={cn(baseClasses, variants[variant], sizes[size], className)}
    >
      {children}
    </Link>
  );
}
