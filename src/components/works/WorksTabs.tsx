import { useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { WorksView } from './works-views';
import { worksViews } from './works-views';

interface WorksTabsProps {
  activeView: WorksView;
  onViewChange: (view: WorksView) => void;
}

const spring = { type: 'spring', stiffness: 420, damping: 34, mass: 0.7 } as const;

/**
 * Accessible category tabs. Arrow keys, Home, and End move selection while the
 * shared layout id slides the active underline between labels.
 */
export function WorksTabs({ activeView, onViewChange }: WorksTabsProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const tabRefs = useRef(new Map<WorksView, HTMLButtonElement>());

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = worksViews.findIndex((view) => view.id === activeView);
    let nextIndex: number | undefined;

    if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % worksViews.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + worksViews.length) % worksViews.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = worksViews.length - 1;
    }

    if (nextIndex === undefined) {
      return;
    }

    const nextView = worksViews[nextIndex];

    if (!nextView) {
      return;
    }

    event.preventDefault();
    onViewChange(nextView.id);
    tabRefs.current.get(nextView.id)?.focus();
  };

  return (
    <div className="tab-scroller -mx-6 overflow-x-auto px-6 py-1 md:mx-0 md:px-0">
      <div
        role="tablist"
        aria-label="Filter work by category"
        onKeyDown={handleKeyDown}
        className="flex min-w-max gap-4 border-b border-heading/15 sm:gap-7 md:gap-10"
      >
        {worksViews.map((view) => {
          const selected = view.id === activeView;

          return (
            <button
              key={view.id}
              ref={(node) => {
                if (node) {
                  tabRefs.current.set(view.id, node);
                } else {
                  tabRefs.current.delete(view.id);
                }
              }}
              type="button"
              role="tab"
              id={`works-tab-${view.id}`}
              aria-selected={selected}
              aria-controls="works-view"
              tabIndex={selected ? 0 : -1}
              onClick={() => onViewChange(view.id)}
              className={[
                'relative -mb-px flex min-h-11 items-center whitespace-nowrap px-0.5 pt-1 pb-3 text-nav font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
                selected ? 'text-heading' : 'text-heading/65 hover:text-heading',
              ].join(' ')}
            >
              {view.label}
              {selected ? (
                <motion.span
                  layoutId="works-tab-indicator"
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-px h-0.5 bg-current"
                  transition={reduceMotion ? { type: 'tween', duration: 0 } : spring}
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
