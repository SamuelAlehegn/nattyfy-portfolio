import { lazy, Suspense } from 'react';
import { useReducedMotion } from 'motion/react';
import { BrandMark } from '@/components/ui/BrandMark';
import { useTheme } from '@/theme/useTheme';

const HeroLogoAnimation = lazy(() => import('./HeroLogoAnimation'));

/**
 * The animated mark needs `matchMedia` (for reduced motion) and
 * `IntersectionObserver` (to pause when offscreen). jsdom exposes neither, so
 * this also keeps the player out of the test bundle.
 */
function canPlayAnimation(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    typeof window.IntersectionObserver === 'function'
  );
}

/**
 * The oversized cyan mark with the construction guides from the hero reference.
 *
 * When motion is allowed the theme-specific Lottie sequence starts from its
 * first frame, exactly like the supplied demos. The static SVG is only used as
 * the fallback for reduced motion or browsers without the APIs the player
 * needs — showing it first would flash the finished mark before the intro.
 */
export function HeroMark() {
  const { resolvedTheme } = useTheme();
  const reduceMotion = useReducedMotion() ?? false;
  const showAnimation = !reduceMotion && canPlayAnimation();

  return (
    <div className="relative aspect-square w-[clamp(16rem,34vw,30rem)]">
      {showAnimation ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 scale-[2.1]">
          <Suspense fallback={null}>
            <HeroLogoAnimation key={resolvedTheme} theme={resolvedTheme} />
          </Suspense>
        </div>
      ) : (
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 flex items-center justify-center">
            <BrandMark className="h-auto w-[87%] text-brand" />
          </div>

          <svg
            viewBox="0 0 460 460"
            fill="none"
            aria-hidden="true"
            focusable="false"
            className="absolute inset-0 size-full text-[var(--brand-blue-500)] opacity-25 dark:text-brand"
          >
            <circle cx="180" cy="270" r="132" stroke="currentColor" strokeWidth="1" />
            <line x1="104" y1="436" x2="436" y2="104" stroke="currentColor" strokeWidth="1" />
            <line x1="200" y1="44" x2="462" y2="306" stroke="currentColor" strokeWidth="1" />
            <line
              x1="36"
              y1="270"
              x2="434"
              y2="270"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.65"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
