import Web3Modal from 'web3modal';
import Web3 from 'web3';
import { provider } from 'web3-core';
import cookie from 'js-cookie';
import {
  ComponentType,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { useMount } from 'react-use';
import { useRouter } from 'next/router';

import { HOME_PAGE_ROUTE } from 'routes';

type TAuthContext = {
  web3Modal: Web3Modal;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  provider: provider;
  web3: Web3;
  account: string;
  chainId: number;
};

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.NEXT_PUBLIC_INFURA_PROJECT_ID,
    },
  },
};

export const AuthContext = createContext<TAuthContext | null>(null);

export const withAuth = <
  P extends Record<string, unknown> = Record<string, unknown>
>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> => {
  const WrappedWithAuth = ({ ...rest }: P) => {
    const [web3Modal, setWeb3Modal] = useState<Web3Modal>();
    const [provider, setProvider] = useState(null);
    const [web3, setWeb3] = useState<Web3>();
    const [account, setAccount] = useState<string>();
    const [chainId, setChainId] = useState<number>();
    const { push } = useRouter();

    const fetchAccountData = async provider => {
      // Get a Web3 instance for the wallet
      const web3 = new Web3(provider);

      setWeb3(web3);

      // Get connected chain id from Ethereum node
      const chainId = await web3.eth.getChainId();

      setChainId(chainId);

      // Get list of accounts of the connected wallet
      const accounts = await web3.eth.getAccounts();

      // MetaMask does not give you all accounts, only the selected account
      setAccount(accounts[0]);
      cookie.set('account', accounts[0]);
    };

    const logout = useCallback(async () => {
      if (provider?.close) {
        await provider.close();
        setProvider(null);
      }

      // If the cached provider is not cleared,
      // WalletConnect will default to the existing session
      // and does not allow to re-scan the QR code with a new wallet.
      // Depending on your use case you may want or want not his behavir.
      web3Modal.clearCachedProvider();
      setChainId(null);
      setAccount(null);
      cookie.remove('account');
      push(HOME_PAGE_ROUTE);
    }, [provider, push, web3Modal]);

    const login = useCallback(
      async (web3ModalInstance?: Web3Modal) => {
        try {
          const provider = await (web3ModalInstance || web3Modal).connect();

          setProvider(provider);

          // Subscribe to accounts change
          provider.on('accountsChanged', () => {
            fetchAccountData(provider);
          });

          // Subscribe to chainId change
          provider.on('chainChanged', () => {
            fetchAccountData(provider);
          });

          // Subscribe to networkId change
          provider.on('networkChanged', () => {
            fetchAccountData(provider);
          });

          await fetchAccountData(provider);
        } catch (e) {
          // show error
          return;
        }
      },
      [web3Modal]
    );

    const ctx = useMemo<TAuthContext>(
      () => ({
        web3,
        account,
        chainId,
        web3Modal,
        login,
        logout,
        provider,
      }),
      [account, chainId, login, logout, provider, web3, web3Modal]
    );

    useMount(() => {
      const web3ModalInstance = new Web3Modal({
        cacheProvider: true,
        providerOptions,
        disableInjectedProvider: false,
      });
      setWeb3Modal(web3ModalInstance);

      login(web3ModalInstance);
    });

    return (
      <AuthContext.Provider value={ctx}>
        <WrappedComponent {...(rest as unknown as P)} />;
      </AuthContext.Provider>
    );
  };

  WrappedWithAuth.displayName = 'WrappedWithAuth';

  return WrappedWithAuth;
};
