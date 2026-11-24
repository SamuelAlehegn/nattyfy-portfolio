import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRightIcon } from '@/components/ui/ArrowRightIcon';
import { EASE_OUT } from '@/lib/motion';
import type { ImageAsset } from '@/types/content';

interface ProjectLightboxProps {
  title: string;
  images: ImageAsset[];
  index: number;
  onClose: () => void;
  onNavigate: (direction: 1 | -1) => void;
}

const controlClasses =
  'flex size-11 items-center justify-center rounded-full bg-[rgb(7_21_31_/_0.82)] text-white shadow-card transition-colors duration-150 hover:bg-highlight hover:text-on-highlight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus';

/**
 * Modal image viewer. Focus moves to the close button, Tab stays inside the
 * dialog, Escape closes it, and the arrow keys move between gallery images.
 */
export function ProjectLightbox({
  title,
  images,
  index,
  onClose,
  onNavigate,
}: ProjectLightboxProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    restoreFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeRef.current?.focus();

    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const bodyPaddingRight = Number.parseFloat(getComputedStyle(body).paddingRight) || 0;

    body.style.overflow = 'hidden';

    // Replace the width taken by a classic scrollbar so hiding it does not shift
    // the page behind the dialog.
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${bodyPaddingRight + scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
      restoreFocusRef.current?.focus();
    };
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === 'ArrowRight' && images.length > 1) {
        event.preventDefault();
        onNavigate(1);
        return;
      }

      if (event.key === 'ArrowLeft' && images.length > 1) {
        event.preventDefault();
        onNavigate(-1);
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      );

      if (!focusable || focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [images.length, onClose, onNavigate],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const image = images[index];

  if (!image) {
    return null;
  }

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgb(7_21_31_/_0.95)] p-4 md:p-10"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${title} image viewer`}
        aria-describedby="project-lightbox-instructions"
        className="relative inline-flex max-h-[90vh] max-w-[90vw] items-center justify-center"
      >
        <p id="project-lightbox-instructions" className="sr-only">
          Use the left and right arrow keys to move between images. Press Escape to close.
        </p>

        <motion.img
          key={`${image.src}-${index}`}
          src={image.src}
          width={image.width}
          height={image.height}
          alt={`${title} — image ${index + 1} of ${images.length}`}
          decoding="async"
          className="max-h-[90vh] max-w-[90vw] rounded-md object-contain shadow-card-hover"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: reduceMotion ? 0 : 0.25,
            ease: EASE_OUT,
          }}
        />

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
          className={`absolute top-2 right-2 z-10 ${controlClasses}`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
            focusable="false"
            className="size-5"
          >
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>

        {images.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => onNavigate(-1)}
              aria-label="Previous image"
              className={`absolute top-1/2 left-2 z-10 -translate-y-1/2 ${controlClasses}`}
            >
              <ArrowRightIcon className="size-6 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate(1)}
              aria-label="Next image"
              className={`absolute top-1/2 right-2 z-10 -translate-y-1/2 ${controlClasses}`}
            >
              <ArrowRightIcon className="size-6" />
            </button>
          </>
        ) : null}

        <p
          aria-live="polite"
          aria-atomic="true"
          className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-[rgb(7_21_31_/_0.82)] px-3 py-1 text-small font-medium text-white"
        >
          {index + 1} / {images.length}
        </p>
      </div>
    </motion.div>,
    document.body,
  );
}
