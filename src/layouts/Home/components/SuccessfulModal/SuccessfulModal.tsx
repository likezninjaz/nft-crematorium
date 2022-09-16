import { useCallback, useEffect, useState } from 'react';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { AbiItem } from 'web3-utils';
// eslint-disable-next-line import/no-unresolved
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
  ViewWrapper,
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
  const [mintedNftId, setMintedNftId] = useState(false);

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

  const handleCloseClick = useCallback(() => {
    setMintedNftId(null);
    onClose();
  }, [onClose]);

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

      const feeValue = await contract.methods.getFeeValue().call();

      if (urnsIPFSImages.length > 1) {
        await contract.methods
          .bulkMint(
            account,
            urnsIPFSImages.map(ipfsImage => `https://ipfs.io/ipfs/${ipfsImage}`)
          )
          .send({
            value: feeValue * urnsIPFSImages.length,
          });
      } else {
        const id = await contract.methods
          .mint(account, `https://ipfs.io/ipfs/${urnsIPFSImages[0]}`)
          .send({
            value: feeValue,
          });
        setMintedNftId(id);
      }
    } catch (e) {
      console.log(e);
      // e
    } finally {
      setIsLoading(false);
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
      <ButtonWrapper isSuccess={mintedNftId}>
        {mintedNftId ? (
          <>
            <ViewWrapper>
              <a
                href={`https://testnets.opensea.io/collection/${process.env.NEXT_PUBLIC_OPENSEA_CONTRACT_NAME}`}
                target="__blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 90 90"
                  fill="black"
                  style={{ marginRight: 10 }}
                >
                  <path d="M90 45C90 69.8514 69.8514 90 45 90C20.1486 90 0 69.8514 0 45C0 20.1486 20.1486 0 45 0C69.8566 0 90 20.1486 90 45Z" />
                  <path
                    d="M22.2011 46.512L22.3953 46.2069L34.1016 27.8939C34.2726 27.6257 34.6749 27.6535 34.8043 27.9447C36.76 32.3277 38.4475 37.7786 37.6569 41.1721C37.3194 42.5683 36.3948 44.4593 35.3545 46.2069C35.2204 46.4612 35.0725 46.7109 34.9153 46.9513C34.8413 47.0622 34.7165 47.127 34.5824 47.127H22.5432C22.2196 47.127 22.0301 46.7756 22.2011 46.512Z"
                    fill="white"
                  />
                  <path
                    d="M74.38 49.9149V52.8137C74.38 52.9801 74.2783 53.1281 74.1304 53.1928C73.2242 53.5812 70.1219 55.0052 68.832 56.799C65.5402 61.3807 63.0251 67.932 57.4031 67.932H33.949C25.6362 67.932 18.9 61.1727 18.9 52.8322V52.564C18.9 52.3421 19.0803 52.1618 19.3023 52.1618H32.377C32.6359 52.1618 32.8255 52.4022 32.8024 52.6565C32.7099 53.5072 32.8671 54.3764 33.2693 55.167C34.0461 56.7435 35.655 57.7283 37.3934 57.7283H43.866V52.675H37.4673C37.1391 52.675 36.9449 52.2959 37.1345 52.0277C37.2038 51.9214 37.2824 51.8104 37.3656 51.6856C37.9713 50.8257 38.8358 49.4895 39.6958 47.9684C40.2829 46.9421 40.8516 45.8463 41.3093 44.746C41.4018 44.5472 41.4758 44.3438 41.5497 44.1449C41.6746 43.7936 41.804 43.4653 41.8965 43.1371C41.9889 42.8597 42.0629 42.5684 42.1369 42.2956C42.3542 41.3617 42.4467 40.3723 42.4467 39.3459C42.4467 38.9437 42.4282 38.523 42.3912 38.1207C42.3727 37.6815 42.3172 37.2423 42.2617 36.8031C42.2247 36.4147 42.1554 36.031 42.0814 35.6288C41.9889 35.0416 41.8595 34.4591 41.7115 33.8719L41.6607 33.65C41.5497 33.2478 41.4573 32.864 41.3278 32.4618C40.9626 31.1996 40.5418 29.9698 40.098 28.8186C39.9362 28.3609 39.7512 27.9217 39.5663 27.4825C39.2935 26.8213 39.0161 26.2203 38.7619 25.6516C38.6324 25.3927 38.5214 25.1569 38.4105 24.9165C38.2857 24.6437 38.1562 24.371 38.0268 24.112C37.9343 23.9132 37.8279 23.7283 37.754 23.5434L36.9634 22.0824C36.8524 21.8836 37.0374 21.6478 37.2546 21.7079L42.2016 23.0487H42.2155C42.2247 23.0487 42.2294 23.0533 42.234 23.0533L42.8859 23.2336L43.6025 23.437L43.866 23.511V20.5706C43.866 19.1512 45.0034 18 46.4089 18C47.1116 18 47.7496 18.2866 48.2073 18.7536C48.665 19.2206 48.9517 19.8586 48.9517 20.5706V24.935L49.4787 25.0829C49.5204 25.0968 49.562 25.1153 49.599 25.143C49.7284 25.2401 49.9133 25.3835 50.1491 25.5591C50.3341 25.7071 50.5329 25.8874 50.7733 26.0723C51.2495 26.4561 51.8181 26.9508 52.4423 27.5194C52.6087 27.6628 52.7706 27.8107 52.9185 27.9587C53.723 28.7076 54.6245 29.5861 55.4845 30.557C55.7249 30.8297 55.9607 31.1071 56.2011 31.3984C56.4415 31.6943 56.6958 31.9856 56.9177 32.2769C57.209 32.6652 57.5233 33.0674 57.7961 33.4882C57.9256 33.687 58.0735 33.8904 58.1984 34.0892C58.5497 34.6209 58.8595 35.1711 59.1554 35.7212C59.2802 35.9755 59.4097 36.2529 59.5206 36.5257C59.8489 37.2608 60.1078 38.0098 60.2742 38.7588C60.3251 38.9206 60.3621 39.0963 60.3806 39.2535V39.2904C60.436 39.5124 60.4545 39.7482 60.473 39.9886C60.547 40.756 60.51 41.5235 60.3436 42.2956C60.2742 42.6239 60.1818 42.9336 60.0708 43.2619C59.9598 43.5763 59.8489 43.9045 59.7056 44.2143C59.4282 44.8569 59.0999 45.4996 58.7115 46.1006C58.5867 46.3225 58.4388 46.5583 58.2908 46.7802C58.129 47.016 57.9626 47.238 57.8146 47.4553C57.6112 47.7327 57.3939 48.0239 57.172 48.2828C56.9732 48.5556 56.7697 48.8284 56.5478 49.0688C56.2381 49.434 55.9422 49.7808 55.6324 50.1137C55.4475 50.331 55.2487 50.5529 55.0452 50.7517C54.8464 50.9736 54.643 51.1724 54.4581 51.3573C54.1483 51.6671 53.8894 51.9075 53.6721 52.1063L53.1635 52.5733C53.0896 52.638 52.9925 52.675 52.8908 52.675H48.9517V57.7283H53.9079C55.0175 57.7283 56.0716 57.3353 56.9223 56.6141C57.2136 56.3598 58.485 55.2594 59.9876 53.5997C60.0384 53.5442 60.1032 53.5026 60.1771 53.4841L73.8668 49.5265C74.1211 49.4525 74.38 49.6467 74.38 49.9149Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a
                href={`https://testnets.opensea.io/assets/rinkeby/${process.env.NEXT_PUBLIC_OPENSEA_CONTRACT_NAME}/${mintedNftId}`}
                target="__blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 293.775 293.671"
                >
                  <g
                    id="etherscan-logo-circle"
                    transform="translate(-219.378 -213.33)"
                  >
                    <path
                      id="Path_1"
                      data-name="Path 1"
                      d="M280.433,353.152A12.45,12.45,0,0,1,292.941,340.7l20.737.068a12.467,12.467,0,0,1,12.467,12.467v78.414c2.336-.692,5.332-1.43,8.614-2.2a10.389,10.389,0,0,0,8.009-10.11V322.073a12.469,12.469,0,0,1,12.468-12.47h20.778a12.469,12.469,0,0,1,12.467,12.467v90.279s5.2-2.106,10.269-4.245a10.408,10.408,0,0,0,6.353-9.577V290.9a12.466,12.466,0,0,1,12.466-12.467h20.778A12.468,12.468,0,0,1,450.815,290.9v88.625c18.014-13.055,36.271-28.758,50.759-47.639a20.926,20.926,0,0,0,3.185-19.537,146.6,146.6,0,0,0-136.644-99.006c-81.439-1.094-148.744,65.385-148.736,146.834a146.371,146.371,0,0,0,19.5,73.45,18.56,18.56,0,0,0,17.707,9.173c3.931-.346,8.825-.835,14.643-1.518a10.383,10.383,0,0,0,9.209-10.306V353.152"
                      fill="#black"
                    />
                    <path
                      id="Path_2"
                      data-name="Path 2"
                      d="M244.417,398.641A146.808,146.808,0,0,0,477.589,279.9c0-3.381-.157-6.724-.383-10.049-53.642,80-152.686,117.4-232.79,128.793"
                      transform="translate(35.564 80.269)"
                      fill="#black"
                    />
                  </g>
                </svg>
              </a>
            </ViewWrapper>
            <Button onClick={handleCloseClick}>Close</Button>
          </>
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
