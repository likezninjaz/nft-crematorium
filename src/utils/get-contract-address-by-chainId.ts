export const getContractAddressByChainId = (chainId: number): string => {
  switch (chainId) {
    case 1:
      return process.env.NEXT_PUBLIC_ETH_NFT_CONTRACT_ADDRESS;
    case 4:
      return process.env.NEXT_PUBLIC_RINKEBY_NFT_CONTRACT_ADDRESS;
    case 56:
      return process.env.NEXT_PUBLIC_BNB_NFT_CONTRACT_ADDRESS;
  }
};
