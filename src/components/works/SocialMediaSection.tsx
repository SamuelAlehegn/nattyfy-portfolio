import { SocialPostsGrid } from './SocialPostsGrid';

/** Social Media Posts view: page label plus the tilted Instagram collage. */
export function SocialMediaSection() {
  return (
    <section aria-labelledby="social-heading">
      <h2 id="social-heading" className="text-h1 font-bold text-heading">
        Social Media Posts
      </h2>

      <SocialPostsGrid />
    </section>
  );
}
