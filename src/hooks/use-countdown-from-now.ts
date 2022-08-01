import { useEffect, useState } from 'react';

import { getTimeFromNow } from '../utils';

export const useCountdownFromNow = (from: Date) => {
  const [time, setTime] = useState(getTimeFromNow(from));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getTimeFromNow(from));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [from]);

  return time;
};
