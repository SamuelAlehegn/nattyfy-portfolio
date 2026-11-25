import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@/components/ui/ArrowRightIcon';
import { cn } from '@/lib/cn';
import { useImageStatus } from '@/lib/useImageStatus';
import type { Project } from '@/types/content';

interface ProjectCardProps {
  project: Project;
  /** Eager-load an above-the-fold card, such as the first row of a filtered view. */
  priority?: boolean;
}

/** Square-cornered, 16:9 portfolio card with skeleton loading, hover lift and title reveal. */
export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const { imageRef, loaded, failed, onLoad, onError } = useImageStatus(project.image.src);

  return (
    <Link
      to={project.href}
      aria-label={`View project: ${project.title}`}
      className="group relative block aspect-video overflow-hidden bg-surface transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-card-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus motion-safe:hover:-translate-y-1"
    >
      {!loaded && !failed ? (
        <span aria-hidden="true" className="skeleton-shimmer absolute inset-0" />
      ) : null}

      {failed ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center bg-surface px-6 text-center text-small text-muted"
        >
          {project.title}
        </span>
      ) : (
        <img
          ref={imageRef}
          src={project.image.src}
          srcSet={project.image.srcSet}
          sizes="(min-width: 1536px) 758px, (min-width: 768px) calc(50vw - 2.5rem), calc(100vw - 3rem)"
          width={project.image.width}
          height={project.image.height}
          alt=""
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'low'}
          onLoad={onLoad}
          onError={onError}
          className={cn(
            'h-full w-full object-cover transition-[opacity,scale,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:blur-md group-focus-visible:blur-md motion-safe:group-hover:scale-[1.045] motion-safe:group-focus-visible:scale-[1.045]',
            loaded ? 'opacity-100' : 'opacity-0',
          )}
        />
      )}

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/80 via-black/40 to-black/20 px-6 text-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <span className="relative inline-flex max-w-full items-center gap-2 text-balance text-card-overlay font-semibold text-white transition-[translate] duration-300 ease-out after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-white after:content-[''] motion-safe:translate-y-2 motion-safe:group-hover:translate-y-0 motion-safe:group-focus-visible:translate-y-0">
          {project.title}
          <ArrowRightIcon className="size-6 shrink-0" />
        </span>
      </span>
    </Link>
  );
}
