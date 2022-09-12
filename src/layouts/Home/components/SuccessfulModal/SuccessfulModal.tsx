import { useCallback, useEffect, useState } from 'react';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { AbiItem } from 'web3-utils';
import { create } from 'ipfs-http-client';

import { Button, Icon, Img, Modal, Typography } from 'components';
import { getHttpClient } from 'utils';
import { useAuth } from 'hooks';
import NFTCrematoriumAbi from 'contracts/NFT-Crematorium.json';
import { TNft } from '@types';

import {
  ButtonWrapper,
  ImageWrapper,
  ItemIcon,
  NftsItem,
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
  const { account, web3 } = useAuth();
  const [urns, setUrns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const title = `I've just cremated my ${selectedNfts
    .map(nft => nft.name)
    .join(', ')} NFT${selectedNfts.length > 1 ? 's' : ''}`;

  const generateUrns = useCallback(async () => {
    const generatedUrns = [];
    for (let i = 0; i < selectedNfts.length; i++) {
      if (selectedNfts[i].image) {
        const { data } = await http.post('/api/urn', {
          nftUrl: selectedNfts[i].image,
          nftTitle: selectedNfts[i].name,
        });
        generatedUrns.push(data);
      }
    }
    setUrns(generatedUrns);
  }, [http, selectedNfts]);

  useEffect(() => {
    generateUrns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNfts]);

  const handleGetUrnsClick = useCallback(async () => {
    setIsLoading(true);
    const contract = new web3.eth.Contract(
      NFTCrematoriumAbi as AbiItem | AbiItem[],
      process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS,
      {
        from: account,
      }
    );

    const PROJECT_ID = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID;
    const PROJECT_SECRET = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_SECRET;
    const ipfsClient = create({
      url: 'https://ipfs.infura.io:5001/',
      headers: {
        Authorization: 'Basic ' + btoa(PROJECT_ID + ':' + PROJECT_SECRET),
      },
    });

    try {
      const urnsIPFSImages = await Promise.all(
        urns.map(async (urn, index) => {
          const arr = urn.split(',');
          const mime = arr[0].match(/:(.*?);/)[1];
          const bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);

          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }

          const file = new File([u8arr], 'urn.png', { type: mime });

          const { path: imagePath } = await ipfsClient.add({ content: file });

          const metaData = {
            description: `Urn with ashes of ${selectedNfts[index].name}`,
            image: `https://ipfs.io/ipfs/${imagePath}`,
            name: `${selectedNfts[index].name} ⚱️`,
            origin: selectedNfts[index].tokenUri,
            attributes: [
              {
                display_type: 'date',
                trait_type: 'Cremation date',
                value: new Date().getTime() / 1000,
              },
            ],
          };

          const { path: metadataPath } = await ipfsClient.add(
            {
              content: JSON.stringify(metaData),
            },
            {
              wrapWithDirectory: false,
            }
          );

          return metadataPath;
        })
      );

      if (urnsIPFSImages.length > 1) {
        await contract.methods
          .bulkMint(
            account,
            urnsIPFSImages.map(ipfsImage => `https://ipfs.io/ipfs/${ipfsImage}`)
          )
          .send();
      } else {
        await contract.methods
          .mint(account, `https://ipfs.io/ipfs/${urnsIPFSImages[0]}`)
          .send();
      }
    } catch (e) {
      // e
    } finally {
      setIsLoading(false);
      setIsSuccess(true);
    }
  }, [account, selectedNfts, urns, web3]);

  return (
    <Modal {...{ isOpen, onClose }} maxWidth="940px">
      <Wrapper>
        <Typography variant="h2">Cremated</Typography>
        <Typography variant="text2" typographyStyle={{ marginTop: 10 }}>
          Your NFT{selectedNfts.length > 1 && 's'} ha
          {selectedNfts.length > 1 ? 've' : 's'} been successfully cremated.
          <br />
          Share this on social networks! Get NFT of urn
          {selectedNfts.length > 1 ? 's' : ''} with ashes to revive your NFT for
          free!
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
            <NftsItem key={index}>
              <ImageWrapper selected={true}>
                <Img src={urns[index]} />
              </ImageWrapper>
              <Typography
                typographyStyle={{
                  marginTop: 7,
                  textAlign: 'left',
                }}
              >
                Urn with {selectedNft.name || `#${selectedNft.tokenId}`} ashes
              </Typography>
            </NftsItem>
          ))}
        </NftsWrapper>
      </Wrapper>
      <ButtonWrapper>
        {isSuccess ? (
          <Typography>Success!!!!</Typography>
        ) : (
          <Button
            onClick={handleGetUrnsClick}
            disabled={isLoading}
            isLoading={isLoading}
          >
            Get Urn{selectedNfts.length > 1 && 's'}
          </Button>
        )}
      </ButtonWrapper>
    </Modal>
  );
};
