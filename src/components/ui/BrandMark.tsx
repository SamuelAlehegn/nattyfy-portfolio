interface BrandMarkProps {
  className?: string;
}

/**
 * Inline mark from resources/Assets/icon.svg.
 * `currentColor` keeps it navy on the light header and cyan on the dark header.
 */
export function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 42.53 37.24"
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
      className={className}
    >
      <path d="M23.84,12.38h-11.46v24.86h0C5.54,37.24,0,31.7,0,24.86v-12.5C0,5.53,5.53,0,12.36,0h1.1l10.39,12.38ZM30.15,0v12.38h12.38V0h-12.38ZM30.15,24.86h-12s10.39,12.38,10.39,12.38h13.99c0-6.84-5.54-12.38-12.38-12.38Z" />
    </svg>
  );
}
