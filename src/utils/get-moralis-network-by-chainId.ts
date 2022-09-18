import { EvmChain } from '@moralisweb3/evm-utils';

export const getMoralisNetworkByChainId = (chainId: number) => {
  switch (chainId) {
    case 1:
      return EvmChain.ETHEREUM;
    case 4:
      return EvmChain.RINKEBY;
    case 137:
      return EvmChain.POLYGON;
    case 25:
      return EvmChain.CRONOS;
    case 56:
      return EvmChain.BSC;
  }
};
