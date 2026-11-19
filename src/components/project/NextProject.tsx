import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@/components/ui/ArrowRightIcon';
import type { Project } from '@/types/content';

interface NextProjectProps {
  project: Project;
}

/** Cyclic "Next Project" row that closes out a case study. */
export function NextProject({ project }: NextProjectProps) {
  return (
    <nav
      aria-labelledby="next-project-heading"
      className="mt-16 border-t border-border pt-8 md:mt-24 md:pt-10"
    >
      <h2
        id="next-project-heading"
        className="text-small font-semibold tracking-[0.18em] text-heading/70 uppercase"
      >
        Next Project
      </h2>

      <Link
        to={project.href}
        aria-label={`Next project: ${project.title}`}
        className="group mt-3 flex items-center justify-between gap-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
      >
        <span className="text-h2 font-bold text-heading group-hover:underline group-hover:underline-offset-8 group-hover:decoration-2">
          {project.title}
        </span>
        <ArrowRightIcon className="size-8 shrink-0 text-heading transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
      </Link>
    </nav>
  );
}
