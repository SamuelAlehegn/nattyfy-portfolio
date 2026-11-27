export function RouteHydrateFallback() {
  return (
    <div className="page-surface flex min-h-svh items-center justify-center bg-white dark:bg-black">
      <p className="text-2xl font-bold text-black dark:text-white">LOADING...</p>
    </div>
  );
}
