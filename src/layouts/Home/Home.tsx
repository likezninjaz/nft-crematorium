import { useCallback, useEffect, useState } from 'react';
import { useToggle } from 'react-use';
import { Alchemy, Network } from 'alchemy-sdk';

import { Button, Img, Loader, Typography } from 'components';
import { useAuth, useItems } from 'hooks';

import {
  BurnWrapper,
  ImageWrapper,
  NftsItem,
  NftsWrapper,
  StyledHome,
} from './Home.styled';
import { WarningModal } from './components';
import { TNft } from './types';

const ALCHEMY_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

export const Home = () => {
  const { account } = useAuth();
  const [isWarningModalOpen, setWarningModalOpen] = useToggle(false);
  const [nfts, { addToEnd }] = useItems<TNft>([]);
  const [selectedNfts, setSelectedNfts] = useState([]);
  const [pageKey, setPageKey] = useState('');
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const alchemy = new Alchemy(ALCHEMY_CONFIG);
      const ownedNftsResponse = await alchemy.nft.getNftsForOwner(
        '0x6434d19c2e6788e53aa3ec5c6fc0112b1852e554',
        pageKey ? { pageKey } : {}
      );

      if (ownedNftsResponse.ownedNfts?.length > 0) {
        setPageKey(ownedNftsResponse.pageKey);
        let newNFts = [];

        for (let i = 0; i < ownedNftsResponse.ownedNfts.length - 1; i++) {
          const nft = ownedNftsResponse.ownedNfts[i];
          if (nft.rawMetadata && Object.keys(nft.rawMetadata).length > 0) {
            newNFts = newNFts.concat({
              tokenId: nft.tokenId,
              name: nft.title,
              image: nft.media[0]?.gateway,
              contractAddress: nft.contract.address,
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
  }, [addToEnd, pageKey]);

  useEffect(() => {
    if (account) getNfts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <StyledHome hasFooter={selectedNfts.length > 0}>
      {nfts.length === 0 && (
        <>
          <Typography
            variant="h1"
            typographyStyle={{ marginTop: 10, cursor: 'default' }}
          >
            {loading ? (
              <Loader />
            ) : (
              <>
                Welcome to
                <br />
                NFT Crematorium
                <br />
                <Typography
                  variant="h2"
                  typographyStyle={{ marginTop: 10, cursor: 'default' }}
                >
                  {account ? (
                    <>
                      Seems that you don't have any NFT yet.
                      <br />
                      Buy some NFT somewhere to cremate them
                    </>
                  ) : (
                    'Connect your wallet to start creamate your NFTs'
                  )}
                </Typography>
              </>
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
                        textAlign: 'left',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
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
            You selected {selectedNfts.length}/{nfts.length}. Click "Cremate" to
            pay respect!
          </Typography>
          <div>
            <Button variant="secondary" onClick={() => setSelectedNfts([])}>
              Cancel
            </Button>
            <Button onClick={() => setWarningModalOpen(true)}>Creamate</Button>
          </div>
        </BurnWrapper>
      )}

      <WarningModal
        isOpen={isWarningModalOpen}
        selectedNfts={selectedNfts}
        onClose={() => setWarningModalOpen(false)}
      />
    </StyledHome>
  );
};
