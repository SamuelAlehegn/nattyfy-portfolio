import { HeroSection } from '@/components/home/HeroSection';
import { PortfolioHighlight } from '@/components/home/PortfolioHighlight';
import { usePageTitle } from '@/lib/usePageTitle';

export function HomePage() {
  usePageTitle();

  return (
    <>
      <HeroSection />
      <PortfolioHighlight />
    </>
  );
}
