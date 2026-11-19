import { Container } from '@/components/layout/Container';
import type { Project } from '@/types/content';
import { NextProject } from './NextProject';
import { ProjectGallery } from './ProjectGallery';
import { ProjectIntro } from './ProjectIntro';

interface ProjectDetailProps {
  project: Project;
  nextProject?: Project | null;
}

/** Shared case-study layout: intro, gallery, then the cyclic next-project link. */
export function ProjectDetail({ project, nextProject }: ProjectDetailProps) {
  return (
    <article className="pb-20 md:pb-28">
      <Container className="pt-16 md:pt-24 lg:pt-26">
        <ProjectIntro project={project} />
        <ProjectGallery title={project.title} images={project.gallery} />
        {nextProject ? <NextProject project={nextProject} /> : null}
      </Container>
    </article>
  );
}
