import { FacebookShareButton, TwitterShareButton } from 'react-share';

import { Icon, Img, Modal, Typography } from 'components';

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
  const title = `I've just cremated my ${selectedNfts
    .map(nft => nft.name)
    .join(', ')} NFT${selectedNfts.length > 1 ? 's' : ''}`;

  //TODO: generaet Urn, example => https://jsfiddle.net/vnmtLjw8/171/

  return (
    <Modal {...{ isOpen, onClose }} maxWidth="700px">
      <Wrapper>
        <Typography variant="h2">Cremated</Typography>
        <Typography variant="text2" typographyStyle={{ marginTop: 10 }}>
          Your NFTs have been successfully cremated. Share this on social
          networks!
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
          {selectedNfts.map((selectedNft, index) => (
            <NftsItem key={index} selected={true}>
              <ImageWrapper selected={true}>
                <Img src="./urn.jpeg" />
              </ImageWrapper>
              <Typography
                typographyStyle={{
                  textAlign: 'left',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {selectedNft.name || `#${selectedNft.tokenId}`}
              </Typography>
            </NftsItem>
          ))}
        </NftsWrapper>
      </Wrapper>
    </Modal>
  );
};
