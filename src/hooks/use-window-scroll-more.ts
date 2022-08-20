import { useCallback, useEffect, useState } from 'react';
import { useWindowScroll, useWindowSize } from 'react-use';

import { useDidUnmount } from './use-did-unmount';

const THRESHOLD = 100;

export const useWindowScrollMore = (
  onFetchMore: () => Promise<void>,
  hasMore: boolean
): boolean => {
  const didUnmount = useDidUnmount();
  const { width } = useWindowSize();
  const { y } = useWindowScroll();
  const [loading, setLoading] = useState<boolean>(false);
  const canFetchMore = !loading && hasMore;

  const fetchMore = useCallback(async () => {
    try {
      setLoading(true);
      await onFetchMore();
    } finally {
      if (!didUnmount.current) setLoading(false);
    }
  }, [didUnmount, onFetchMore]);

  useEffect(() => {
    const { scrollHeight, clientHeight } = document.documentElement;
    const hasVerticalScroll = scrollHeight > clientHeight;

    if (canFetchMore) {
      if (!hasVerticalScroll || clientHeight + y + THRESHOLD > scrollHeight) {
        fetchMore().catch();
      }
    }
  }, [canFetchMore, width, fetchMore, y]);

  return loading;
};
