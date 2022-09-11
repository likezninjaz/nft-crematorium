require('@nomiclabs/hardhat-waffle');
require('solidity-coverage');
require('hardhat-contract-sizer');
require('hardhat-abi-exporter');
require('@nomiclabs/hardhat-etherscan');
require('@nomiclabs/hardhat-web3');

const { alchemyApiKey, privateKey, etherscanApiKey } = require('./secrets.json');

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
    only: [],
    spacing: 2,
  },
  etherscan: {
    apiKey: {
      rinkeby: etherscanApiKey
    }
  },
};
