require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const pk = process.env.PRIVATEKEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    fxMainnet: {
      url: "https://fx-json-web3.functionx.io:8545",
      accounts: [`0x${pk}`],
      networkCheckTimeout: 999999,
      timeoutBlocks: 200,
    }
  }
};
