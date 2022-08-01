import { RefObject, useEffect, useRef } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export const useScrollLock = <T extends HTMLElement = HTMLDivElement>(
  isLocked: boolean
): RefObject<T> => {
  const ref = useRef();

  useEffect(() => {
    const element = ref.current;

    if (isLocked && element) {
      disableBodyScroll(element);
    }

    return () => {
      if (element) enableBodyScroll(element);
    };
  }, [isLocked]);

  return ref;
};
