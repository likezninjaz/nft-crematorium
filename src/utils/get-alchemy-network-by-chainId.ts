import { Network } from 'alchemy-sdk';

export const getAlchemyNetworkByChainId = (chainId: number) => {
  switch (chainId) {
    case 1:
      return Network.ETH_MAINNET;
    case 4:
      return Network.ETH_RINKEBY;
    case 137:
      return Network.MATIC_MAINNET;
  }
};
