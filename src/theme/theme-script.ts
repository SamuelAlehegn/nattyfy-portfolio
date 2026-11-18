export const THEME_STORAGE_KEY = 'natnael-theme';

export const THEME_COLORS = {
  light: '#24c2c7',
  dark: '#07151f',
} as const;

export const themeInitScript = `(function(){try{var key=${JSON.stringify(
  THEME_STORAGE_KEY,
)};var stored=localStorage.getItem(key);var mode=stored==='light'||stored==='dark'||stored==='system'?stored:'system';var systemDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='dark'||(mode==='system'&&systemDark)?'dark':'light';var root=document.documentElement;root.classList.toggle('dark',resolved==='dark');root.dataset.theme=resolved;root.style.colorScheme=resolved;var meta=document.querySelector('meta[name="theme-color"]');if(meta){meta.setAttribute('content',resolved==='dark'?${JSON.stringify(
  THEME_COLORS.dark,
)}:${JSON.stringify(THEME_COLORS.light)});}}catch(e){}})();`;
