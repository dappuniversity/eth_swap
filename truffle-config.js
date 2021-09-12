require('babel-register');
require('babel-polyfill');
require('dotenv').config();

const HDWalletProvider = require('truffle-hdwallet-provider-privkey');
const privateKeys = [process.env.PRIVATE_KEY]

module.exports = {
  plugins: [
    'truffle-plugin-verify'
  ],
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: '*'
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(
          privateKeys, // Array of account private keys
          `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`// Url to an Ethereum Node
        )
      },
      // gas: 5000000,
      // gasPrice: 5000000000, // 5 gwei
      network_id: 4,
      // skipDryRun: true
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: '0.6.12',
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: "petersburg"
    }
  },
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY
  }
}
