import { useParams } from 'react-router-dom';
import { ProjectDetail } from '@/components/project/ProjectDetail';
import { worksProjects } from '@/data/projects';
import { NotFoundPage } from './NotFoundPage';

/**
 * Data-driven case-study route. The project is resolved from `worksProjects`,
 * so adding a project (or its copy and gallery) is enough to publish its page.
 */
export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const projectIndex = worksProjects.findIndex((item) => item.id === slug);
  const project = worksProjects[projectIndex];

  if (projectIndex === -1 || !project) {
    return <NotFoundPage />;
  }

  const nextProject =
    worksProjects.length > 1
      ? (worksProjects[(projectIndex + 1) % worksProjects.length] ?? null)
      : null;

  return <ProjectDetail project={project} nextProject={nextProject} />;
}
