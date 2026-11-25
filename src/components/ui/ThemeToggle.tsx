import { useTheme } from '@/theme/useTheme';

/** Sun from resources/Assets/light_icon.svg (shown in dark mode). */
function SunIcon() {
  return (
    <svg
      viewBox="0 0 108.06 108.06"
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
      className="size-6"
    >
      <path d="M54.03,77.96c-13.19,0-23.93-10.73-23.93-23.93s10.73-23.93,23.93-23.93,23.93,10.73,23.93,23.93-10.73,23.93-23.93,23.93Z" />
      <path d="M54.03,21.49c-2.21,0-4-1.79-4-4V4c0-2.21,1.79-4,4-4s4,1.79,4,4v13.49c0,2.21-1.79,4-4,4Z" />
      <path d="M54.03,108.06c-2.21,0-4-1.79-4-4v-13.5c0-2.21,1.79-4,4-4s4,1.79,4,4v13.5c0,2.21-1.79,4-4,4Z" />
      <path d="M104.07,58.03h-13.5c-2.21,0-4-1.79-4-4s1.79-4,4-4h13.5c2.21,0,4,1.79,4,4s-1.79,4-4,4Z" />
      <path d="M17.5,58.03H4c-2.21,0-4-1.79-4-4s1.79-4,4-4h13.5c2.21,0,4,1.79,4,4s-1.79,4-4,4Z" />
      <path d="M79.87,32.19c-1.02,0-2.05-.39-2.83-1.17-1.56-1.56-1.56-4.09,0-5.65l9.54-9.54c1.56-1.56,4.09-1.56,5.65,0,1.56,1.56,1.56,4.09,0,5.65l-9.54,9.54c-.78.78-1.8,1.17-2.83,1.17Z" />
      <path d="M18.65,93.41c-1.02,0-2.05-.39-2.83-1.17-1.56-1.56-1.56-4.09,0-5.65l9.55-9.54c1.56-1.56,4.09-1.56,5.65,0,1.56,1.56,1.56,4.09,0,5.65l-9.55,9.54c-.78.78-1.8,1.17-2.83,1.17Z" />
      <path d="M28.2,32.19c-1.02,0-2.05-.39-2.83-1.17l-9.49-9.49c-.76-.73-1.23-1.75-1.23-2.88,0-2.21,1.79-4,4-4h1.66l10.71,10.71c1.56,1.56,1.56,4.09,0,5.65-.78.78-1.8,1.17-2.83,1.17Z" />
      <path d="M89.41,93.41c-1.02,0-2.05-.39-2.83-1.17l-9.54-9.54c-1.56-1.56-1.56-4.09,0-5.65,1.56-1.56,4.09-1.56,5.65,0l9.54,9.54c1.56,1.56,1.56,4.09,0,5.65-.78.78-1.8,1.17-2.83,1.17Z" />
    </svg>
  );
}

/** Moon from resources/Assets/dark_icon.svg (shown in light mode). */
function MoonIcon() {
  return (
    <svg viewBox="0 0 113.87 113.87" aria-hidden="true" focusable="false" className="size-6">
      <circle cx="56.93" cy="56.93" r="56.93" fill="currentColor" />
      <path
        fill="var(--brand-cyan-500)"
        d="M58.53,96.62c-21.36-.28-38.91-16.64-41.06-37.5-1.75-16.94,7.36-33.18,22.26-41.43l.11-.06c2.13-1.18,4.71.49,4.51,2.92l-.1,1.15c-.1,1.23-.16,2.48-.16,3.73,0,24.45,19.88,44.34,44.33,44.34,1.26,0,2.52-.05,3.75-.16l1.15-.1c2.42-.2,4.1,2.38,2.92,4.51l-.14.26c-7.57,13.68-21.93,22.54-37.57,22.33Z"
      />
    </svg>
  );
}

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="inline-flex size-9 items-center justify-center rounded-full text-header-fg transition-colors duration-150 hover:text-yellow-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
