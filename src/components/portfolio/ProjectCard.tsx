import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@/components/ui/ArrowRightIcon';
import type { Project } from '@/types/content';

interface ProjectCardProps {
  project: Project;
}

/** Square-cornered, 16:9 portfolio card with skeleton loading, hover lift, blur and title reveal. */
export function ProjectCard({ project }: ProjectCardProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // Cached images may finish before React attaches onLoad.
    if (imageRef.current?.complete) {
      setLoaded(true);
    }
  }, []);

  return (
    <Link
      to={project.href}
      aria-label={`View project: ${project.title}`}
      className="group relative block aspect-video overflow-hidden bg-surface transition-[transform,box-shadow] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-card-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus motion-safe:hover:-translate-y-1"
    >
      {!loaded && !failed ? (
        <span aria-hidden="true" className="skeleton-shimmer absolute inset-0" />
      ) : null}

      <img
        ref={imageRef}
        src={project.image.src}
        srcSet={project.image.srcSet}
        sizes="(min-width: 1536px) 758px, (min-width: 768px) calc(50vw - 2.5rem), calc(100vw - 3rem)"
        width={project.image.width}
        height={project.image.height}
        alt=""
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={[
          'h-full w-full object-cover transition-[opacity,transform,filter] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:brightness-[1.04] group-hover:blur-md group-focus-visible:blur-md motion-safe:group-hover:scale-[1.06] motion-safe:group-focus-visible:scale-[1.06]',
          loaded ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center bg-overlay/40 px-6 text-center opacity-0 transition-opacity duration-250 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <span className="relative inline-flex items-center gap-2 text-card-overlay font-semibold text-white after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:bg-white after:content-['']">
          {project.title}
          <ArrowRightIcon className="size-6 shrink-0" />
        </span>
      </span>
    </Link>
  );
}
