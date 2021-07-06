require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  defaultNetwork: "testnet",
  networks: {
    testnet: {
      url: "https://babel-api.testnet.iotex.io",
      accounts: ['1225c2ef4c20914dfcb88041d3c7ce36cb528712f4bebcf5f242ae23e74235fc'],
      chainId: 4690,
      gas: 8500000,
      gasPrice: 1000000000000
    },
  },

};

