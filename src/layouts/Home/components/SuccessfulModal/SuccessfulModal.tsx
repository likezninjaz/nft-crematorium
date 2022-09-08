import { useCallback, useEffect, useState } from 'react';
import { FacebookShareButton, TwitterShareButton } from 'react-share';

import { Button, Icon, Img, Modal, Typography } from 'components';
import { getHttpClient } from 'utils';

import { ImageWrapper, NftsItem } from '../../Home.styled';
import { TNft } from '../../types';

import {
  ItemIcon,
  NftsWrapper,
  ShareWrapper,
  Wrapper,
} from './SuccessfulModal.styled';

type TSuccessfulModal = {
  isOpen: boolean;
  onClose: () => void;
  selectedNfts: Array<TNft>;
};

export const SuccessfulModal = ({
  isOpen,
  onClose,
  selectedNfts,
}: TSuccessfulModal) => {
  const http = getHttpClient();
  const [urns, setUrns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const title = `I've just cremated my ${selectedNfts
    .map(nft => nft.name)
    .join(', ')} NFT${selectedNfts.length > 1 ? 's' : ''}`;

  const generateUrns = useCallback(async () => {
    setIsLoading(true);
    for (let i = 0; i < selectedNfts.length; i++) {
      if (selectedNfts[i].image) {
        const { data } = await http.post('/api/urn', {
          nftUrl: selectedNfts[i].image,
        });
        setUrns([...urns, data]);
      }
    }
    setIsLoading(false);
  }, [http, selectedNfts, urns]);

  useEffect(() => {
    setUrns([]);
    generateUrns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNfts]);

  return (
    <Modal {...{ isOpen, onClose }} maxWidth="700px">
      <Wrapper>
        <Typography variant="h2">Cremated</Typography>
        <Typography variant="text2" typographyStyle={{ marginTop: 10 }}>
          Your NFT{selectedNfts.length > 1 && 's'} ha
          {selectedNfts.length > 1 ? 've' : 's'} been successfully cremated.
          Share this on social networks! Also, select urns with the ash of your
          NFTs to get them as NFT!
        </Typography>
        <ShareWrapper>
          <FacebookShareButton
            url={'https://www.nft-crematorium.com'}
            quote={title}
            hashtag="nftcrematorium"
            style={{ width: 40, marginRight: 20 }}
          >
            <ItemIcon>
              <Icon icon="facebook" viewBox="-5 -1 18 18" />
            </ItemIcon>
          </FacebookShareButton>
          <TwitterShareButton
            url={'https://www.nft-crematorium.com'}
            title={title}
            hashtags={['nft', 'nftcrematorium']}
            style={{ width: 40 }}
          >
            <ItemIcon>
              <Icon icon="twitter" viewBox="0 -1 20 18" />
            </ItemIcon>
          </TwitterShareButton>
        </ShareWrapper>
        <NftsWrapper>
          {selectedNfts.map(
            (selectedNft, index) =>
              urns[index] && (
                <NftsItem key={index} selected={true}>
                  <ImageWrapper selected={true}>
                    <Img src={urns[index]} />
                  </ImageWrapper>
                  <Typography
                    typographyStyle={{
                      marginTop: 7,
                      textAlign: 'left',
                    }}
                  >
                    Urn with "{selectedNft.name || `#${selectedNft.tokenId}`}"
                    ashes
                  </Typography>
                </NftsItem>
              )
          )}
        </NftsWrapper>
        {isLoading && <>Generating urns...</>}
        <Button onClick={() => null} buttonStyle={{ marginTop: 10 }}>
          Get Urns
        </Button>
      </Wrapper>
    </Modal>
  );
};
