import { memo } from 'react';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { worksProjects } from '@/data/projects';

interface BrandsSectionProps {
  /** The brand grid is at the top of this view, so its first row should load eagerly. */
  prioritize?: boolean;
}

/** My Works brand cards: full eight-card grid, no fade or More button. */
export const BrandsSection = memo(function BrandsSection({
  prioritize = false,
}: BrandsSectionProps) {
  return (
    <section aria-labelledby="brands-heading">
      <h2 id="brands-heading" className="text-label font-semibold text-heading">
        Brands
      </h2>

      <ul className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2 md:gap-5">
        {worksProjects.map((project, index) => (
          <li key={project.id}>
            <ProjectCard project={project} priority={prioritize && index < 2} />
          </li>
        ))}
      </ul>
    </section>
  );
});
