import { Img, Modal, Typography } from 'components';

import { ImageWrapper, NftsItem, NftsWrapper } from '../../Home.styled';
import { TNft } from '../../types';

import { Wrapper } from './SuccessfulModal.styled';

type TSuccessfulModal = {
  isOpen: boolean;
  onClose: () => void;
  selectedNfts: Array<TNft>;
};

export const SuccessfulModal = ({
  isOpen,
  onClose,
  selectedNfts,
}: TSuccessfulModal) => (
  <Modal {...{ isOpen, onClose }} maxWidth="700px">
    <Wrapper>
      <Typography variant="h2">Success</Typography>
      <Typography variant="text2" typographyStyle={{ marginTop: 10 }}>
        Your NFTs have been successfully cremated. Share this event on social
        networks!
      </Typography>
      <NftsWrapper>
        {selectedNfts.map(selectedNft => (
          <NftsItem key={selectedNft.tokenId} selected={true}>
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
