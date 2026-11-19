import { Link, useParams } from 'react-router-dom';
import { Container } from '@/components/layout/Container';
import { worksProjects } from '@/data/projects';
import { NotFoundPage } from './NotFoundPage';

/**
 * Minimal destination for the My Works cards. The full case-study layout
 * (gallery, copy, next-project link) is built in Phase 4.
 */
export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = worksProjects.find((item) => item.id === slug);

  if (!project) {
    return <NotFoundPage />;
  }

  return (
    <Container className="py-20 md:py-28">
      <Link
        to="/works"
        className="inline-flex min-h-11 items-center gap-2 text-small font-semibold text-heading/80 underline-offset-4 transition-colors duration-150 hover:text-heading hover:underline"
      >
        <span aria-hidden="true">&larr;</span>
        Back to My Works
      </Link>

      <p className="mt-10 text-small font-semibold tracking-[0.18em] text-heading/70 uppercase">
        Brand project
      </p>
      <h1 className="mt-2 text-h1 text-heading">{project.title}</h1>
      <p className="mt-4 max-w-[66rem] text-body text-heading/80">
        The full case study for this project is coming soon.
      </p>
    </Container>
  );
}
