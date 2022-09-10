const { ethers } = require('hardhat');

const setup = async props => {
  const NFTCrematorium = await ethers.getContractFactory('NFTCrematorium');
  const NFTCrematoriumContract = await NFTCrematoriumContract.deploy();

  return { NFTCrematoriumContract };
}

module.exports = { setup };
