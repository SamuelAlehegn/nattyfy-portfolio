import { useParams } from 'react-router-dom';
import { ProjectDetail } from '@/components/project/ProjectDetail';
import { worksProjects } from '@/data/projects';
import { usePageTitle } from '@/lib/usePageTitle';
import type { Project } from '@/types/content';
import { NotFoundPage } from './NotFoundPage';

interface ProjectDetailContentProps {
  project: Project;
  nextProject: Project | null;
}

/** Keeps the title hook out of the not-found branch so hooks stay unconditional. */
function ProjectDetailContent({ project, nextProject }: ProjectDetailContentProps) {
  usePageTitle(project.title);

  return <ProjectDetail project={project} nextProject={nextProject} />;
}

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

  return <ProjectDetailContent project={project} nextProject={nextProject} />;
}
