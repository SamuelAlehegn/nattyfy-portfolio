import { SocialPostsGrid } from './SocialPostsGrid';

interface SocialMediaSectionProps {
  /** The social tab sits directly under the tabs, so its first row should load eagerly. */
  prioritize?: boolean;
}

/** Social Media Posts view: page label plus the tilted Instagram collage. */
export function SocialMediaSection({ prioritize = false }: SocialMediaSectionProps) {
  return (
    <section aria-labelledby="social-heading">
      <h2 id="social-heading" className="text-h1 font-bold text-heading">
        Social Media Posts
      </h2>

      <SocialPostsGrid prioritize={prioritize} />
    </section>
  );
}
