import { useCallback, useState } from 'react';

type ImageStatus = 'loading' | 'loaded' | 'failed';

interface ImageState {
  src: string;
  status: ImageStatus;
}

/**
 * Tracks whether an image has loaded or failed.
 *
 * A cached image can finish before React attaches `onLoad`. Checking
 * `complete`/`naturalWidth` from the ref callback catches that commit-time case
 * without an effect or a one-frame skeleton flash. The state is keyed by `src`
 * so a changed image reports `loading` immediately.
 */
export function useImageStatus(src: string) {
  const [state, setState] = useState<ImageState>({ src, status: 'loading' });
  const status = state.src === src ? state.status : 'loading';

  const imageRef = useCallback(
    (image: HTMLImageElement | null) => {
      if (!image?.complete) {
        return;
      }

      const nextStatus: ImageStatus = image.naturalWidth > 0 ? 'loaded' : 'failed';

      setState((current) =>
        current.src === src && current.status === nextStatus
          ? current
          : { src, status: nextStatus },
      );
    },
    [src],
  );

  // The ref callback may already have reported a cached image. Skip the render
  // when the load event confirms the same state.
  const onLoad = useCallback(
    () =>
      setState((current) =>
        current.src === src && current.status === 'loaded' ? current : { src, status: 'loaded' },
      ),
    [src],
  );
  const onError = useCallback(
    () =>
      setState((current) =>
        current.src === src && current.status === 'failed' ? current : { src, status: 'failed' },
      ),
    [src],
  );

  return {
    imageRef,
    status,
    loaded: status === 'loaded',
    failed: status === 'failed',
    onLoad,
    onError,
  };
}
