require('@nomiclabs/hardhat-waffle');
require('solidity-coverage');
require('hardhat-contract-sizer');
require('hardhat-abi-exporter');
require('@nomiclabs/hardhat-etherscan');
require('@nomiclabs/hardhat-web3');

const { alchemyApiKey, privateKey, bscApiKey } = require('./secrets.json');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: '0.8.17',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      initialBaseFeePerGas: 1,
    },
    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${alchemyApiKey}`,
      accounts: [`0x${privateKey}`]
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: [`0x${privateKey}`]
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${alchemyApiKey}`,
      accounts: [`0x${privateKey}`]
    },
  },
  paths: {
    sources: './src/contracts',
    tests: './src/contracts/test',
    cache: './src/contracts/cache',
    artifacts: './src/contracts/artifacts',
  },
  abiExporter: {
    path: './src/contracts/abi',
    clear: true,
    flat: true,
    only: ['NFTCrematorium'],
    spacing: 2,
  },
  etherscan: {
    apiKey: {
      bsc: bscApiKey
    }
  },
};
