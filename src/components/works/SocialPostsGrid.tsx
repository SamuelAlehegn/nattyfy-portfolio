import { socialPosts } from '@/data/socialPosts';
import { InstagramCard } from './InstagramCard';

/** The reference collage shows three designs repeated across three rows. */
const SLOT_COUNT = 9;

export function SocialPostsGrid() {
  if (socialPosts.length === 0) {
    return (
      <p className="mt-6 max-w-[40rem] text-body text-muted">
        Social media post designs are coming soon.
      </p>
    );
  }

  const seenPosts = new Set<string>();

  return (
    <div
      role="region"
      aria-label="Social media post designs"
      tabIndex={0}
      className="tab-scroller -mx-6 mt-8 overflow-x-auto px-6 pb-8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus md:mx-0 md:mt-16 md:overflow-visible md:px-0 md:pb-0 xl:mt-60"
    >
      {/* The 11rem inset keeps the rotated corners of the outer cards on screen. */}
      <ul className="flex snap-x snap-mandatory gap-4 md:mx-auto md:grid md:max-w-[52rem] md:grid-cols-2 md:gap-x-6 md:gap-y-10 xl:max-w-[min(90rem,calc(100vw-11rem))] xl:grid-cols-3 xl:gap-x-0 xl:gap-y-9">
        {Array.from({ length: SLOT_COUNT }, (_, index) => {
          const post = socialPosts[index % socialPosts.length];

          if (!post) {
            return null;
          }

          const decorative = seenPosts.has(post.id);
          seenPosts.add(post.id);

          const tabletTilt = Math.round(post.tilt * 0.45 * 10) / 10;

          return (
            <li
              key={`${post.id}-${index}`}
              className="w-[82vw] max-w-[25rem] shrink-0 snap-center md:w-full md:max-w-none md:justify-self-center md:last:hidden xl:last:block"
            >
              <InstagramCard
                post={post}
                tilt={post.tilt}
                tabletTilt={tabletTilt}
                decorative={decorative}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
