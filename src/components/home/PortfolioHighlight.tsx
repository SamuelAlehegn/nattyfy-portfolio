import { Container } from '@/components/layout/Container';
import { ArrowRightIcon } from '@/components/ui/ArrowRightIcon';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { homeProjects } from '@/data/projects';
import { ProjectCard } from '@/components/portfolio/ProjectCard';

export function PortfolioHighlight() {
  return (
    <section aria-labelledby="portfolio-heading" className="pt-14 pb-20 md:pt-24 md:pb-32">
      <Container>
        <h2 id="portfolio-heading" className="text-center text-h2 font-bold text-heading">
          Portfolio Highlight
        </h2>

        <div className="relative mt-8">
          <ul className="home-portfolio-grid grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {homeProjects.map((project) => (
              <li key={project.id}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center pb-6 md:pb-8">
            <ButtonLink
              to="/works"
              variant="outline"
              size="lg"
              className="pointer-events-auto"
              ariaLabel="View more projects"
            >
              More
              <ArrowRightIcon className="size-6 shrink-0" />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
