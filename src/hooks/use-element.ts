import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { useWindowSize } from 'react-use';

const DEFAULT_DIMENSIONS = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: 0,
  height: 0,
  scrollWidth: 0,
  scrollHeight: 0,
};

export const useElement = <T extends HTMLElement = HTMLDivElement>(): [
  RefObject<T>,
  typeof DEFAULT_DIMENSIONS
] => {
  const ref = useRef<T>(null);
  const windowSize = useWindowSize();
  const [dimensions, setDimensions] = useState(DEFAULT_DIMENSIONS);

  const calculateDimensions = useCallback(() => {
    if (ref.current) {
      const { width, height, top, bottom, left, right } =
        ref.current.getBoundingClientRect();

      setDimensions({
        width,
        height,
        scrollWidth: ref.current.scrollWidth,
        scrollHeight: ref.current.scrollHeight,
        top: top + window.pageYOffset,
        bottom: bottom + window.pageYOffset,
        left: left + window.pageXOffset,
        right: right + window.pageXOffset,
      });
    }
  }, []);

  useEffect(() => {
    calculateDimensions();
  }, [windowSize, calculateDimensions]);

  return [ref, dimensions];
};
