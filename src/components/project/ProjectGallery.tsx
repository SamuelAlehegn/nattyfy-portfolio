import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/cn';
import { EASE_OUT } from '@/lib/motion';
import { useImageStatus } from '@/lib/useImageStatus';
import type { ImageAsset } from '@/types/content';
import { ProjectLightbox } from './ProjectLightbox';

interface ProjectGalleryProps {
  title: string;
  images?: ImageAsset[];
}

interface GalleryFrameProps {
  image: ImageAsset;
  index: number;
  title: string;
  onOpen: (index: number) => void;
}

/**
 * Full-width case-study gallery with a one-shot scroll reveal. Missing
 * galleries and broken images both get a designed fallback instead of a gap.
 */
export function ProjectGallery({ title, images = [] }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openImage = useCallback((index: number) => setActiveIndex(index), []);
  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const navigate = useCallback(
    (direction: 1 | -1) => {
      setActiveIndex((current) => {
        if (current === null || images.length === 0) {
          return current;
        }

        return (current + direction + images.length) % images.length;
      });
    },
    [images.length],
  );

  return (
    <section aria-labelledby="project-gallery-heading" className="mt-10 md:mt-12">
      <h2 id="project-gallery-heading" className="sr-only">
        Project gallery
      </h2>

      {images.length > 0 ? (
        <ul className="space-y-6">
          {images.map((image, index) => (
            <GalleryFrame
              key={`${image.src}-${index}`}
              image={image}
              index={index}
              title={title}
              onOpen={openImage}
            />
          ))}
        </ul>
      ) : (
        <div className="flex min-h-64 items-center justify-center border border-border bg-elevated px-6 py-16 text-center md:py-24">
          <p className="max-w-md text-body text-muted">
            Project imagery is on its way. Check back soon for the full visual story.
          </p>
        </div>
      )}

      {activeIndex !== null ? (
        <ProjectLightbox
          title={title}
          images={images}
          index={activeIndex}
          onClose={closeLightbox}
          onNavigate={navigate}
        />
      ) : null}
    </section>
  );
}

const GalleryFrame = memo(function GalleryFrame({
  image,
  index,
  title,
  onOpen,
}: GalleryFrameProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const frameRef = useRef<HTMLLIElement>(null);
  const { imageRef, loaded, failed, onLoad, onError } = useImageStatus(image.src);
  // Test environments and older browsers have no observer, so reveal eagerly.
  const [revealed, setRevealed] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const frame = frameRef.current;

    if (!frame || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(frame);

    return () => observer.disconnect();
  }, []);

  return (
    <motion.li
      ref={frameRef}
      initial={reduceMotion ? false : { opacity: 0, scale: 1.03 }}
      animate={revealed ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE_OUT }}
      className="overflow-hidden"
    >
      {failed ? (
        <div className="flex aspect-video items-center justify-center border border-border bg-elevated px-6 text-center">
          <p className="text-body text-muted">This image could not be loaded.</p>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => onOpen(index)}
          aria-label={`View ${title} image ${index + 1} larger`}
          aria-haspopup="dialog"
          className="group relative block aspect-video w-full cursor-zoom-in overflow-hidden bg-surface focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
        >
          {!loaded ? (
            <span aria-hidden="true" className="skeleton-shimmer absolute inset-0" />
          ) : null}

          <img
            ref={imageRef}
            src={image.src}
            srcSet={image.srcSet}
            sizes="(min-width: 1616px) 1536px, (min-width: 768px) calc(100vw - 2.5rem), calc(100vw - 3rem)"
            width={image.width}
            height={image.height}
            alt={`${title} brand mockup ${index + 1}`}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={index === 0 ? 'high' : 'low'}
            onLoad={onLoad}
            onError={onError}
            className={cn(
              'h-full w-full object-cover transition-[opacity,transform] duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.01]',
              loaded ? 'opacity-100' : 'opacity-0',
            )}
          />
        </button>
      )}
    </motion.li>
  );
});
