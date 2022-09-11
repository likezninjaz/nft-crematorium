import { useCallback, useEffect, useState } from 'react';
import { useToggle } from 'react-use';
import Head from 'next/head';
import { Alchemy, Network } from 'alchemy-sdk';

import { Button, Img, Loader, Typography } from 'components';
import { useAuth, useItems } from 'hooks';
import { isProduction } from 'utils';
import { TNft } from '@types';

import {
  BurnWrapper,
  ImageWrapper,
  NftsItem,
  NftsWrapper,
  StyledHome,
} from './Home.styled';
import { WarningModal } from './components';

const ALCHEMY_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: isProduction() ? Network.ETH_MAINNET : Network.ETH_RINKEBY,
};

export const Home = () => {
  const { account } = useAuth();
  const [isWarningModalOpen, setWarningModalOpen] = useToggle(false);
  const [nfts, { addToEnd, clear }] = useItems<TNft>([]);
  const [selectedNfts, setSelectedNfts] = useState([]);
  const [pageKey, setPageKey] = useState('');
  const [loading, setLoading] = useState(true);

  const handleSelectNft = useCallback(
    (nft: TNft) => () => {
      if (selectedNfts.includes(nft)) {
        setSelectedNfts(
          selectedNfts.filter(selectedNft => selectedNft !== nft)
        );
      } else {
        setSelectedNfts([...selectedNfts, nft]);
      }
    },
    [selectedNfts]
  );

  const getNfts = useCallback(async () => {
    clear();
    setLoading(true);
    try {
      const alchemy = new Alchemy(ALCHEMY_CONFIG);
      const ownedNftsResponse = await alchemy.nft.getNftsForOwner(
        account,
        pageKey ? { pageKey } : {}
      );

      if (ownedNftsResponse.ownedNfts?.length > 0) {
        setPageKey(ownedNftsResponse.pageKey);
        let newNFts = [];

        for (let i = 0; i < ownedNftsResponse.ownedNfts.length; i++) {
          const nft = ownedNftsResponse.ownedNfts[i];
          if (
            nft.rawMetadata &&
            Object.keys(nft.rawMetadata).length > 0 &&
            nft.contract.address.toLowerCase() !==
              process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS.toLowerCase()
          ) {
            newNFts = newNFts.concat({
              tokenId: nft.tokenId,
              name: nft.title || 'N/A',
              image: nft.media[0]?.gateway,
              contractAddress: nft.contract.address,
              tokenUri: nft.tokenUri.raw,
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
  }, [account, addToEnd, clear, pageKey]);

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
              Select NFTs for cremation
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
            <Typography>
              You selected {selectedNfts.length}/{nfts.length}. Click "Cremate"
              to start the creamation!
            </Typography>
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
