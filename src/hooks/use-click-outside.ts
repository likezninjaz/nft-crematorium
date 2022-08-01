import { RefObject, useEffect, useRef } from 'react';

export const useClickOutside = <E extends Event = Event>(
  onClickOutside: (event: E) => void,
  ...refs: RefObject<HTMLElement | SVGSVGElement | null>[]
) => {
  const savedCallback = useRef(onClickOutside);

  useEffect(() => {
    savedCallback.current = onClickOutside;
  }, [onClickOutside]);

  useEffect(() => {
    const handler = event => {
      let isTarget = false;

      for (const ref of refs) {
        const { current: element } = ref;

        if (element && element.contains(event.target)) {
          isTarget = true;
          break;
        }
      }

      if (!isTarget) savedCallback.current(event);
    };

    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [refs]);
};
