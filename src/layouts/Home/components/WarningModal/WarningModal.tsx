import { useCallback, useState } from 'react';
import { useToggle } from 'react-use';
import { AbiItem } from 'web3-utils';

import { Button, Modal, Typography } from 'components';
import { useAuth } from 'hooks';
import ERC721Abi from 'contracts/ERC721.json';

import { SuccessfulModal } from '../SuccessfulModal';
import { TNft } from '../../types';

import { Wrapper } from './WarningModal.styled';

type TWarningModal = {
  isOpen: boolean;
  onClose: () => void;
  selectedNfts: Array<TNft>;
};

export const WarningModal = ({
  isOpen,
  onClose,
  selectedNfts,
}: TWarningModal) => {
  const [isSuccessfulModalOpen, setSuccessfulModalOpen] = useToggle(false);
  const { account, web3 } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmClick = useCallback(async () => {
    setIsLoading(true);
    // const contract = new web3.eth.Contract(
    //   ERC721Abi as AbiItem | AbiItem[],
    //   selectedContract,
    //   {
    //     from: account,
    //   }
    // );

    // for (let i = 0; i < selectedNfts.length; i++) {
    //   await contract.methods
    //     .transferFrom(
    //       account,
    //       '0xc8BB5586CfDaa13f3041694B999fc7Ad4f5fbE7D',
    //       Number(selectedNfts[i].tokenId)
    //     )
    //     .send();
    // }
    setSuccessfulModalOpen(true);
    setIsLoading(false);
    onClose();
  }, [onClose, setSuccessfulModalOpen]);

  return (
    <>
      <Modal {...{ isOpen, onClose }} maxWidth="600px">
        <Wrapper>
          <Typography variant="h2">Warning</Typography>
          <Typography variant="text2" typographyStyle={{ marginTop: 10 }}>
            Once confirmed, your NFTs will be burned. To revive them you will
            have to perform additional actions with associated costs.
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
