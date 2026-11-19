import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { worksProjects } from '@/data/projects';

/** My Works brand cards: full eight-card grid, no fade or More button. */
export function BrandsSection() {
  return (
    <section aria-labelledby="brands-heading">
      <h2 id="brands-heading" className="text-label font-semibold text-heading">
        Brands
      </h2>

      <ul className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2 md:gap-5">
        {worksProjects.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
