import { Link } from 'react-router-dom';
import { BrandMark } from './BrandMark';

interface LogoProps {
  onNavigate?: () => void;
}

/**
 * Desktop: mark + live-text wordmark (238 × 37, matching header_logo.svg).
 * Mobile: mark only, as required by resources/Assets/Instructions.txt.
 */
export function Logo({ onNavigate }: LogoProps) {
  return (
    <Link
      to="/"
      onClick={onNavigate}
      aria-label="Natnael Fikreyesus — home"
      className="inline-flex shrink-0 items-center gap-[0.68rem] text-logo focus-visible:outline-offset-4"
    >
      <BrandMark className="h-[1.85rem] w-auto" />
      <span className="hidden font-display text-[1.35rem] leading-none md:inline">NATNAEL F.</span>
    </Link>
  );
}
