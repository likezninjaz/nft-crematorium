import React, { useEffect, useRef } from 'react';

export const useDidUnmount = (): React.RefObject<boolean> => {
  const didUnmount = useRef<boolean>(false);

  useEffect(
    () => () => {
      didUnmount.current = true;
    },
    []
  );

  return didUnmount;
};
