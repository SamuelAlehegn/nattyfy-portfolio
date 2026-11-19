import { LottieInteractions, LottieLight, lottieInView } from 'lottie-react';
import logoDark from '@/assets/animations/logo-dark.json';
import logoLight from '@/assets/animations/logo-light.json';
import type { ResolvedTheme } from '@/types/theme';

interface HeroLogoAnimationProps {
  theme: ResolvedTheme;
}

/**
 * Theme-aware Lottie version of the hero mark. This module is loaded lazily by
 * `HeroMark`, and both animations are bundled into it so the player never has
 * to wait on a second request before the intro starts.
 */
export default function HeroLogoAnimation({ theme }: HeroLogoAnimationProps) {
  return (
    <LottieInteractions interactions={[lottieInView({ amount: 0 })]}>
      <LottieLight
        src={theme === 'dark' ? logoDark : logoLight}
        autoplay={false}
        loop
        aria-hidden="true"
        className="size-full"
      />
    </LottieInteractions>
  );
}
