interface ArrowRightIconProps {
  className?: string;
}

/** Thin line arrow used by "More →" and the project hover overlay. */
export function ArrowRightIcon({ className }: ArrowRightIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}
