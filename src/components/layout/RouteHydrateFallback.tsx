import { BrandMark } from '@/components/ui/BrandMark';

/**
 * Shown only while a lazily loaded route module is fetched on a direct visit.
 * The inline theme script has already applied the correct palette.
 */
export function RouteHydrateFallback() {
  return (
    <div className="page-surface flex min-h-svh items-center justify-center">
      <BrandMark className="h-12 w-auto animate-pulse text-brand" />
      <span role="status" className="sr-only">
        Loading page
      </span>
    </div>
  );
}
