import { motion, useReducedMotion } from 'motion/react';
import { Container } from '@/components/layout/Container';
import { BrandsSection } from './BrandsSection';
import { LogosSection } from './LogosSection';
import { SocialMediaSection } from './SocialMediaSection';
import { WorksTabs } from './WorksTabs';
import type { WorksView } from './works-views';

interface WorksShowcaseProps {
  activeView: WorksView;
  onViewChange: (view: WorksView) => void;
}

const easeOut = [0.22, 1, 0.36, 1] as [number, number, number, number];

/** Tabs and the filtered brand/logo/social panels below the page title. */
export function WorksShowcase({ activeView, onViewChange }: WorksShowcaseProps) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section aria-label="Work categories" className="pb-20 md:pb-28">
      <Container>
        <WorksTabs activeView={activeView} onViewChange={onViewChange} />

        <div
          id="works-view"
          role="tabpanel"
          aria-labelledby={`works-tab-${activeView}`}
          tabIndex={activeView === 'social' ? 0 : undefined}
          className="pt-10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus md:pt-16"
        >
          <motion.div
            key={activeView}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: easeOut }}
          >
            {activeView === 'all' ? (
              <>
                <BrandsSection />
                <div className="mt-20 md:mt-28">
                  <LogosSection />
                </div>
                <div className="mt-20 md:mt-28">
                  <SocialMediaSection />
                </div>
              </>
            ) : null}

            {activeView === 'brands' ? <BrandsSection /> : null}
            {activeView === 'logos' ? <LogosSection /> : null}
            {activeView === 'social' ? <SocialMediaSection prioritize /> : null}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
