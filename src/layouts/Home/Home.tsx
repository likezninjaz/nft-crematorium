import { useCallback, useEffect, useState } from 'react';
import { useToggle } from 'react-use';
import Head from 'next/head';
import Moralis from 'moralis';

import { Button, Img, Loader, Typography } from 'components';
import { useAuth, useItems } from 'hooks';
import { getContractAddressByChainId, getMoralisNetworkByChainId } from 'utils';
import { TNft } from '@types';

import {
  BurnWrapper,
  ImageWrapper,
  NftsItem,
  NftsWrapper,
  StyledHome,
} from './Home.styled';
import { WarningModal } from './components';

export const Home = () => {
  const { account, chainId } = useAuth();
  const [isWarningModalOpen, setWarningModalOpen] = useToggle(false);
  const [nfts, { addToEnd, clear }] = useItems<TNft>([]);
  const [selectedNfts, setSelectedNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSelectNft = useCallback(
    (nft: TNft) => () => {
      setSelectedNfts([nft]);
    },
    []
  );

  const getNfts = useCallback(async () => {
    clear();
    setLoading(true);
    try {
      await Moralis.start({
        apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
      });
      const response = await Moralis.EvmApi.nft.getWalletNFTs({
        address: account,
        chain: getMoralisNetworkByChainId(chainId),
      });
      const ownedNfts = response.toJSON();

      if (ownedNfts.length > 0) {
        let newNFts = [];

        for (let i = 0; i < ownedNfts.length; i++) {
          const nft = ownedNfts[i];
          if (
            nft.metadata &&
            Object.keys(nft.metadata).length > 0 &&
            nft.tokenAddress.toLowerCase() !==
              getContractAddressByChainId(chainId)?.toLowerCase()
          ) {
            newNFts = newNFts.concat({
              tokenId: nft.tokenId,
              name: nft.metadata.name || 'N/A',
              image: nft.metadata.image,
              contractAddress: nft.tokenAddress,
              tokenUri: nft.tokenUri,
            });
          }
        }
        addToEnd(newNFts);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [account, addToEnd, chainId, clear]);

  useEffect(() => {
    if (account) getNfts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <>
      <Head>
        <title>NFT Crematorium</title>
      </Head>
      <StyledHome hasFooter={selectedNfts.length > 0}>
        {nfts.length === 0 && (
          <>
            <Typography
              variant="h1"
              typographyStyle={{ marginTop: 10, cursor: 'default' }}
            >
              {loading && account ? (
                <Loader />
              ) : (
                <Typography
                  variant="h2"
                  typographyStyle={{ cursor: 'default' }}
                >
                  {account ? (
                    <>
                      Seems that you don't have any NFT yet.
                      <br />
                      <a
                        href="https://opensea.io/"
                        target="_blank"
                        style={{ textDecoration: 'underline' }}
                      >
                        Get some NFTs
                      </a>{' '}
                      to cremate them.
                    </>
                  ) : (
                    'Connect your wallet to start the cremation of your NFTs'
                  )}
                </Typography>
              )}
            </Typography>
          </>
        )}
        {nfts.length > 0 && (
          <>
            <Typography variant="text" typographyStyle={{ marginTop: 20 }}>
              Select NFT for cremation
            </Typography>
            <NftsWrapper>
              {nfts.map(
                (nft, index) =>
                  nft.image && (
                    <NftsItem
                      key={index}
                      selected={selectedNfts.includes(nft)}
                      onClick={handleSelectNft(nft)}
                    >
                      <ImageWrapper selected={selectedNfts.includes(nft)}>
                        <Img hasPlaceholder src={nft.image} />
                      </ImageWrapper>
                      <Typography
                        typographyStyle={{
                          margin: 12,
                          textAlign: 'left',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                        }}
                      >
                        {nft.name}
                      </Typography>
                    </NftsItem>
                  )
              )}
            </NftsWrapper>
          </>
        )}
        {selectedNfts.length > 0 && (
          <BurnWrapper>
            <Typography>Click "Cremate" to start the creamation!</Typography>
            <div>
              <Button variant="secondary" onClick={() => setSelectedNfts([])}>
                Cancel
              </Button>
              <Button onClick={() => setWarningModalOpen(true)}>
                Creamate
              </Button>
            </div>
          </BurnWrapper>
        )}

        <WarningModal
          isOpen={isWarningModalOpen}
          selectedNfts={selectedNfts}
          onClose={() => setWarningModalOpen(false)}
          onCremate={() => getNfts()}
        />
      </StyledHome>
    </>
  );
};
