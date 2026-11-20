import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { SocialPost } from '@/types/content';

interface InstagramCardProps {
  post: SocialPost;
  /** Desktop rotation in degrees. */
  tilt: number;
  /** Tablet rotation in degrees (the design reduces the tilt on tablets). */
  tabletTilt: number;
  /**
   * Repeated collage cards are purely visual. They stay in the DOM for the
   * layout but are hidden from assistive technology.
   */
  decorative?: boolean;
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M12 20.7 4.9 13.6a4.7 4.7 0 0 1 0-6.6 4.7 4.7 0 0 1 6.6 0l.5.5.5-.5a4.7 4.7 0 0 1 6.6 0 4.7 4.7 0 0 1 0 6.6Z" />
    </svg>
  );
}

function CommentIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" />
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="m14.5 6.5 5.5 5.5-5.5 5.5" />
      <path d="M20 12H10.5A5.5 5.5 0 0 0 5 17.5V19" />
    </svg>
  );
}

function MoreIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <circle cx="5" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="19" cy="12" r="1.6" />
    </svg>
  );
}

/**
 * Instagram-style chrome around a square social post artwork. The fake
 * controls are decorative spans (not buttons) so they never become dead-end
 * tab stops, and repeated collage copies are hidden from screen readers.
 */
export function InstagramCard({ post, tilt, tabletTilt, decorative = false }: InstagramCardProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // Cached images may finish before React attaches onLoad.
    const image = imageRef.current;

    if (!image?.complete) {
      return;
    }

    if (image.naturalWidth === 0) {
      setFailed(true);
    } else {
      setLoaded(true);
    }
  }, []);

  const [firstHashtag, ...remainingHashtags] = post.hashtags;

  const cardStyle = {
    '--tilt-md': `${tabletTilt}deg`,
    '--tilt-lg': `${tilt}deg`,
  } as CSSProperties;

  return (
    <article
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : `${post.title} Instagram post design`}
      style={cardStyle}
      className="instagram-card w-full overflow-hidden rounded-md bg-[#f5f5f5] text-[#262626]"
    >
      <header aria-hidden="true" className="flex items-center gap-3 px-4 py-4 lg:gap-4 lg:px-5">
        <span className="size-10 shrink-0 rounded-full bg-[#4d4d4d] ring-1 ring-white lg:size-12" />

        <span className="min-w-0 flex-1 truncate font-instagram text-instagram font-medium lg:text-base">
          {post.username}
        </span>

        <span className="inline-flex h-7 items-center rounded-[0.375rem] bg-[#dcdcdc] px-3 text-instagram-sm font-bold tracking-wide lg:h-8 lg:px-4 lg:text-[0.8125rem]">
          FOLLOW
        </span>

        <MoreIcon className="size-5 shrink-0 lg:size-6" />
      </header>

      <div className="relative aspect-square bg-[#efefef]">
        {!loaded && !failed ? (
          <span aria-hidden="true" className="absolute inset-0 animate-pulse bg-[#efefef]" />
        ) : null}

        {failed ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[#efefef] px-6 text-center font-instagram text-instagram text-[#666]">
            Post artwork unavailable
          </div>
        ) : (
          <img
            ref={imageRef}
            src={post.image.src}
            srcSet={post.image.srcSet}
            sizes="(min-width: 768px) 400px, 82vw"
            width={post.image.width}
            height={post.image.height}
            alt={decorative ? '' : post.alt}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={[
              'h-full w-full object-cover transition-opacity duration-350',
              loaded ? 'opacity-100' : 'opacity-0',
            ].join(' ')}
          />
        )}
      </div>

      <footer aria-hidden="true" className="px-4 pt-3 pb-4 font-instagram lg:px-5 lg:pt-4 lg:pb-4">
        <div className="flex items-center gap-4 text-[#262626] lg:gap-5">
          <HeartIcon className="size-6 lg:size-7" />
          <CommentIcon className="size-6 lg:size-7" />
          <ShareIcon className="size-6 lg:size-7" />
        </div>

        <p className="mt-2 text-instagram font-bold lg:mt-3 lg:text-base">{post.likes} likes</p>

        <p className="mt-1 text-instagram leading-[1.35] lg:mt-1.5 lg:text-base">
          <span className="font-semibold">{post.username}</span> {post.caption}
          {firstHashtag ? (
            <>
              {' '}
              <span className="text-[#00376b]">{firstHashtag}</span>
            </>
          ) : null}
        </p>

        {remainingHashtags.length > 0 ? (
          <p className="text-instagram leading-[1.35] text-[#00376b] lg:text-base">
            {remainingHashtags.join(' ')}
          </p>
        ) : null}
      </footer>
    </article>
  );
}
