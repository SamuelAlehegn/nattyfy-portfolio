import type { Project } from '@/types/content';

interface ProjectIntroProps {
  project: Project;
}

/**
 * Case-study title and copy. Projects can ship before their final copy is
 * written, so an empty description falls back to a short, honest placeholder.
 */
export function ProjectIntro({ project }: ProjectIntroProps) {
  const paragraphs = (project.description ?? [])
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <header>
      <h1 className="text-h1 font-bold text-heading">{project.title}</h1>

      {paragraphs.length > 0 ? (
        <div className="mt-10 max-w-[66rem] space-y-4 text-body text-copy md:mt-12">
          {paragraphs.map((paragraph, index) => (
            <p key={`${project.id}-paragraph-${index}`}>{paragraph}</p>
          ))}
        </div>
      ) : (
        <p className="mt-10 max-w-[66rem] text-body text-copy md:mt-12">
          The full case study for this project is coming soon.
        </p>
      )}
    </header>
  );
}
