export const THEME_STORAGE_KEY = 'natnael-theme';

/** First-visit fallback. Visitors can still switch to light or system. */
export const DEFAULT_THEME_MODE = 'dark' as const;

export const THEME_COLORS = {
  light: '#24c2c7',
  dark: '#07151f',
} as const;

export const themeInitScript = `(function(){try{var key=${JSON.stringify(
  THEME_STORAGE_KEY,
)};var stored=localStorage.getItem(key);var mode=stored==='light'||stored==='dark'||stored==='system'?stored:${JSON.stringify(
  DEFAULT_THEME_MODE,
)};var systemDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='dark'||(mode==='system'&&systemDark)?'dark':'light';var root=document.documentElement;root.classList.toggle('dark',resolved==='dark');root.dataset.theme=resolved;root.style.colorScheme=resolved;var meta=document.querySelector('meta[name="theme-color"]');if(meta){meta.setAttribute('content',resolved==='dark'?${JSON.stringify(
  THEME_COLORS.dark,
)}:${JSON.stringify(THEME_COLORS.light)});}}catch(e){}})();`;
