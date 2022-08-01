import { useCallback, useState } from 'react';
import { useToggle } from 'react-use';
import { css } from '@emotion/react';
import { AbiItem } from 'web3-utils';

import { Button, Img, Input, Typography } from 'components';
import { useAuth } from 'hooks';
import ERC721Abi from 'contracts/ERC721.json';

import {
  BurnWrapper,
  ImageWrapper,
  NftsItem,
  NftsWrapper,
  StyledHome,
} from './Home.styled';
import { WarningModal } from './components';
import { TNft } from './types';

export const Home = () => {
  const { account, web3 } = useAuth();
  const [isWarningModalOpen, setWarningModalOpen] = useToggle(false);
  const [nfts, setNfts] = useState<Array<TNft>>([]);
  const [selectedContract, setSelectedContract] = useState({
    address: '',
    name: '',
    symbol: '',
  });
  const [selectedNfts, setSelectedNfts] = useState([]);

  const handleChange = useCallback(
    async e => {
      if (web3.utils.isAddress(e.target.value)) {
        setSelectedContract(e.target.value);
        const contract = new web3.eth.Contract(
          ERC721Abi as AbiItem | AbiItem[],
          e.target.value,
          {
            from: account,
          }
        );

        const contractName = await contract.methods.name().call();
        const contractSymbol = await contract.methods.symbol().call();
        setSelectedContract({
          address: e.target.value,
          name: contractName,
          symbol: contractSymbol,
        });

        const nftBalance = await contract.methods.balanceOf(account).call();

        if (nftBalance > 0) {
          let newNFts = [];

          for (let i = 0; i < nftBalance; i++) {
            const tokenId = await contract.methods
              .tokenOfOwnerByIndex(account, i)
              .call();
            const tokenUri: string = await contract.methods
              .tokenURI(tokenId)
              .call();
            const ipfsData = await fetch(
              tokenUri.replace('ipfs://', '	https://ipfs.io/ipfs/')
            ); // TODO: check the url
            const ipfsDataJson = await ipfsData.json();
            newNFts = newNFts.concat({
              tokenId,
              name: ipfsDataJson.name,
              image: ipfsDataJson.image.replace(
                'ipfs://',
                '	https://ipfs.io/ipfs/'
              ), // TODO: check the url
            });
            setNfts(newNFts);
          }
        }
      }
    },
    [account, web3]
  );

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

  const handleChangeContractClick = useCallback(() => {
    setSelectedContract({
      address: '',
      name: '',
      symbol: '',
    });
    setNfts([]);
    setSelectedNfts([]);
  }, []);

  return (
    <StyledHome hasFooter={selectedNfts.length > 0}>
      {nfts.length === 0 && (
        <>
          <Typography
            variant="h1"
            typographyStyle={{ marginTop: 10, cursor: 'default' }}
          >
            Welcome to
            <br />
            NFT Crematorium
          </Typography>
          <Typography
            variant="text"
            typographyStyle={({ theme }) =>
              css`
                margin-top: 20px;
                color: ${theme.colors.secondary};
                cursor: default;
              `
            }
          >
            Paste your NFT contract address to start the creamtion
          </Typography>
          {account && (
            <Input
              placeholder="0x..."
              onChange={handleChange}
              inputStyle={{ marginTop: 20, minWidth: 420 }}
            />
          )}
        </>
      )}
      {nfts.length > 0 && (
        <>
          <Typography variant="h2" typographyStyle={{ marginTop: 20 }}>
            Select NFT of {selectedContract.name} for cremation or{' '}
            <strong
              style={{ fontWeight: 'bold' }}
              onClick={handleChangeContractClick}
            >
              change the contract
            </strong>
          </Typography>
          <NftsWrapper>
            {nfts.map(nft => (
              <NftsItem
                key={nft.tokenId}
                selected={selectedNfts.includes(nft)}
                onClick={handleSelectNft(nft)}
              >
                <ImageWrapper selected={selectedNfts.includes(nft)}>
                  <Img src={nft.image} />
                </ImageWrapper>
                <Typography
                  typographyStyle={{
                    textAlign: 'left',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {nft.name || `${selectedContract.symbol} #${nft.tokenId}`}
                </Typography>
              </NftsItem>
            ))}
          </NftsWrapper>
        </>
      )}
      {selectedNfts.length > 0 && (
        <BurnWrapper>
          <Typography>
            You selected {selectedNfts.length}/{nfts.length}{' '}
            {selectedContract.symbol}. Click "Cremate" to pay respect!
          </Typography>
          <Button onClick={() => setWarningModalOpen(true)}>Creamate</Button>
        </BurnWrapper>
      )}

      <WarningModal
        isOpen={isWarningModalOpen}
        selectedContract={selectedContract.address}
        selectedNfts={selectedNfts}
        onClose={() => setWarningModalOpen(false)}
      />
    </StyledHome>
  );
};
