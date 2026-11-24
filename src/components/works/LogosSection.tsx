import { memo } from 'react';
import { logos } from '@/data/logos';

interface LogosSectionProps {
  /** The logo wall sits under the tabs in this view, so its first row should load eagerly. */
  prioritize?: boolean;
}

/** Seamless three-column logo wall; one and two columns on smaller screens. */
export const LogosSection = memo(function LogosSection({ prioritize = false }: LogosSectionProps) {
  return (
    <section aria-labelledby="logos-heading">
      <h2 id="logos-heading" className="text-label font-semibold text-heading">
        Logos
      </h2>

      <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {logos.map((logo, index) => {
          const eager = prioritize && index < 3;

          return (
            <li
              key={logo.id}
              className="group relative aspect-[4/3] overflow-hidden transition-shadow duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-10 hover:shadow-card motion-reduce:transition-none"
              style={{ backgroundColor: logo.background }}
            >
              <img
                src={logo.image}
                alt={`${logo.name} logo`}
                width={516}
                height={384}
                loading={eager ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={eager ? 'high' : 'low'}
                className="h-full w-full object-cover transition-[scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.04]"
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
});
