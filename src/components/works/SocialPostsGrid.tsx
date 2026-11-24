import { socialPosts } from '@/data/socialPosts';
import { InstagramCard } from './InstagramCard';

/** The reference collage shows three designs repeated across three rows. */
const SLOT_COUNT = 9;

/**
 * The repeated collage slots are static, so compute which cards are decorative
 * once at module load instead of on every render.
 */
const seenPosts = new Set<string>();
const collageSlots = Array.from({ length: SLOT_COUNT }, (_, index) => {
  const post = socialPosts[index % Math.max(socialPosts.length, 1)];

  if (!post) {
    return null;
  }

  const decorative = seenPosts.has(post.id);
  seenPosts.add(post.id);

  return { post, key: `${post.id}-${index}`, index, decorative };
});

interface SocialPostsGridProps {
  /** True when the social view is the active tab, so the first row is above the fold. */
  prioritize?: boolean;
}

export function SocialPostsGrid({ prioritize = false }: SocialPostsGridProps) {
  if (socialPosts.length === 0) {
    return (
      <p className="mt-6 max-w-[40rem] text-body text-muted">
        Social media post designs are coming soon.
      </p>
    );
  }

  return (
    <div
      role="region"
      aria-label="Social media post designs"
      tabIndex={0}
      className="tab-scroller -mx-6 mt-8 overflow-x-auto overscroll-x-contain px-6 pb-8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus md:mx-0 md:mt-16 md:overflow-visible md:px-0 md:pb-0 xl:mt-48 xl:px-16"
    >
      {/* Extra inset and gaps keep the straight three-column grid balanced on wide screens. */}
      <ul className="flex snap-x snap-mandatory gap-4 md:mx-auto md:grid md:max-w-[52rem] md:grid-cols-2 md:gap-x-6 md:gap-y-10 xl:max-w-[min(90rem,calc(100vw-11rem))] xl:grid-cols-3 xl:gap-x-6 xl:gap-y-9">
        {collageSlots.map((slot) => {
          if (!slot) {
            return null;
          }

          return (
            <li
              key={slot.key}
              className="w-[82vw] max-w-[25rem] shrink-0 snap-center md:w-full md:max-w-none md:justify-self-center md:last:hidden xl:last:block"
            >
              <InstagramCard
                post={slot.post}
                decorative={slot.decorative}
                priority={prioritize && slot.index < 3}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
