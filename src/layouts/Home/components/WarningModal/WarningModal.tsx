import { useCallback, useState } from 'react';
import { useToggle } from 'react-use';
import { AbiItem } from 'web3-utils';

import { Button, Modal, Typography } from 'components';
import { useAuth } from 'hooks';
import ERC721Abi from 'contracts/ERC721.json';

import { SuccessfulModal } from '../SuccessfulModal';
import { TNft } from '../../../../@types/nft';

import { Wrapper } from './WarningModal.styled';

type TWarningModal = {
  isOpen: boolean;
  onClose: () => void;
  selectedNfts: Array<TNft>;
  onCremate: () => void;
};

export const WarningModal = ({
  isOpen,
  onClose,
  selectedNfts,
  onCremate,
}: TWarningModal) => {
  const [isSuccessfulModalOpen, setSuccessfulModalOpen] = useToggle(false);
  const { account, web3 } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmClick = useCallback(async () => {
    setIsLoading(true);

    for (let i = 0; i < selectedNfts.length; i++) {
      const contract = new web3.eth.Contract(
        ERC721Abi as AbiItem | AbiItem[],
        selectedNfts[i].contractAddress,
        {
          from: account,
        }
      );

      // TODO: add the creamation animation based on https://codepen.io/jkantner/pen/gKRKKb

      await contract.methods
        .transferFrom(
          account,
          process.env.NEXT_PUBLIC_CREMATORIUM_ADDRESS,
          Number(selectedNfts[i].tokenId)
        )
        .send();
    }

    onCremate();
    setSuccessfulModalOpen(true);
    setIsLoading(false);
    onClose();
  }, [account, onClose, onCremate, selectedNfts, setSuccessfulModalOpen, web3]);

  return (
    <>
      <Modal {...{ isOpen, onClose }} maxWidth="600px">
        <Wrapper>
          <Typography variant="h2">Warning</Typography>
          <Typography variant="text2" typographyStyle={{ marginTop: 10 }}>
            Once confirmed, your NFTs will be burned.
            <br />
            You can revive them in the future.
          </Typography>
          <div>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmClick}
              isLoading={isLoading}
              buttonStyle={{ marginTop: 20 }}
            >
              Confirm
            </Button>
          </div>
        </Wrapper>
      </Modal>
      <SuccessfulModal
        isOpen={isSuccessfulModalOpen}
        selectedNfts={selectedNfts}
        onClose={() => setSuccessfulModalOpen(false)}
      />
    </>
  );
};
