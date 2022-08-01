import { Web3Provider } from '@ethersproject/providers';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import { isAddress } from '@ethersproject/address';

export const web3Fetcher =
  (library: Web3Provider, abi?: ContractInterface) =>
  (...args) => {
    const [arg1, arg2, ...rest] = args;

    if (isAddress(arg1)) {
      const contract = new Contract(arg1, abi, library.getSigner());
      return contract[arg2](...rest);
    }

    return library[arg1](arg2, ...rest);
  };
