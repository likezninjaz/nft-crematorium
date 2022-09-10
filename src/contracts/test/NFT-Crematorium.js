const { expect } = require('chai');
const { ethers } = require('hardhat');

const { setup } = require('./setup');

let NFTCrematoriumContract;

describe('NFT Crematorium contract unit tests', () => {
  beforeEach(async () => {
    const utils = await setup();
    NFTCrematoriumContract = utils.NFTCrematoriumContract;
  });

  it('get name', async () => {
    expect(await NFTCrematoriumContract.name()).to.equal('NFT CREMATORIUM');
  });

  it('get symbol', async () => {
    expect(await NFTCrematoriumContract.symbol()).to.equal('NFTCREMATORIUM');
  });

  it('bulk mint', async () => {
    const [owner] = await ethers.getSigners();
    await NFTCrematoriumContract.bulkMint(owner.address, ['https://ipfs.io/ipfs/1111111', 'https://ipfs.io/ipfs/2222222']);
    expect(await NFTCrematoriumContract.tokenURI(1)).to.equal('https://ipfs.io/ipfs/1111111');
    expect(await NFTCrematoriumContract.tokenURI(2)).to.equal('https://ipfs.io/ipfs/2222222');
  });

  it('mint fixed', async () => {
    const [owner] = await ethers.getSigners();
    await NFTCrematoriumContract.mint(owner.address, 'https://ipfs.io/ipfs/1111111');
  });

  it('burn', async () => {
    const [owner] = await ethers.getSigners();
    await NFTCrematoriumContract.mint(owner.address, 'https://ipfs.io/ipfs/1111111');
    await NFTCrematoriumContract.burn(1);
  });

  it('supports interface', async () => {
    expect(await NFTCrematoriumContract.supportsInterface(0x09403cb6)).to.equal(false);
  });
});
