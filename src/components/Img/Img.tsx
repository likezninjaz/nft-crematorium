import { useCallback, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useMountedState, useUpdateEffect } from 'react-use';

import { TEmotionProps } from '@types';

import { Placeholder, StyledImg } from './Img.styled';

type TImg = {
  src: string;
  alt?: string;
  imageStyle?: TEmotionProps;
  className?: string;
};

export const Img = ({ src, alt = '', ...rest }: TImg) => {
  const isMounted = useMountedState();
  const { ref, inView } = useInView();
  const [isLoaded, setLoaded] = useState(false);
  const [isError, setError] = useState(false);
  const [detected, setDetected] = useState(false);

  const handleLoad = useCallback(() => {
    if (isMounted()) setLoaded(true);
  }, [isMounted]);

  const handleError = useCallback(() => {
    if (isMounted()) setError(true);
  }, [isMounted]);

  useUpdateEffect(() => {
    let image: HTMLImageElement;

    if (detected) {
      image = new Image();
      image.addEventListener('load', handleLoad);
      image.addEventListener('error', handleError);
      image.src = src;
    }

    return () => {
      if (image) {
        image.removeEventListener('load', handleLoad);
        image.removeEventListener('error', handleError);
      }
      setLoaded(false);
      setError(false);
    };
  }, [src, detected]);

  useUpdateEffect(() => {
    if (inView) setDetected(true);
  }, [inView]);

  if (!isLoaded || isError) {
    return <Placeholder {...{ ...rest, ref }} />;
  }

  return <StyledImg {...{ ...rest, src, alt }} />;
};
