const Grumpy = artifacts.require("Grumpy");
const Pawth = artifacts.require("Pawthereum");
const PostWindowGrumpyPawthSwap = artifacts.require("PostWindowGrumpyPawthSwap");

module.exports = async function(deployer) {

  const accounts = await web3.eth.getAccounts()

  // // Deploy Grumpy
  await deployer.deploy(Grumpy);
  const grumpy = await Grumpy.deployed()

  // Deploy Pawth
  await deployer.deploy(Pawth);
  const pawth = await Pawth.deployed()

  // Deploy PostWindowGrumpyPawthSwap
  await deployer.deploy(PostWindowGrumpyPawthSwap, grumpy.address, pawth.address);
  console.log('grumpy.address', grumpy.address)
  console.log('pawth.address', pawth.address)

  const postWindowGrumpyPawthSwap = await PostWindowGrumpyPawthSwap.deployed()
  console.log('postWindowGrumpyPawthSwap.address', postWindowGrumpyPawthSwap.address)
  // // Transfer all pawth to PostWindowGrumpyPawthSwap (1 billion)
  const pawthTotalSupply = await pawth.totalSupply()
  await pawth.transfer(postWindowGrumpyPawthSwap.address, pawthTotalSupply.toString())
  // await pawth.transfer(accounts[0], '500000000')

  // // Transfer 100 Trillion grupy to user who deployed the contract
  const grumpyTotalSupply = await grumpy.totalSupply()
  await grumpy.transfer(accounts[0], grumpyTotalSupply.toString())
};

