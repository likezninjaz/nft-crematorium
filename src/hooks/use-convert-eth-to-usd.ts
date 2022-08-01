import useSWR from 'swr';

import { getHttpClient } from 'utils';

type TConvertResponse = {
  USD: number;
};

export const useConvertETHToUSD = (value: string | number) => {
  const { data, isValidating } = useSWR<TConvertResponse>(
    'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD',
    path => getHttpClient().get(path),
    { refreshInterval: 5 * 60 * 1000 }
  );
  const eth = Number(value) || 0;
  const exchange = data?.USD ?? 0;

  return [(exchange * eth).toFixed(2), isValidating];
};
