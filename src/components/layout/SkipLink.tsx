export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-sm focus:bg-surface focus:px-4 focus:py-2 focus:text-copy focus:text-heading focus:shadow-focus"
    >
      Skip to main content
    </a>
  );
}
