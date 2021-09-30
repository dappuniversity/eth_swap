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

  // set the swap limit for each grumpy holder
  for await (mapping of mappings) {
    const nineZeros = '000000000'
    const balance = mapping.Balance.toString().replace(/,/g,'').replace(/\./g, '') + nineZeros
    console.log('setting ' + mapping.Address + ' balance to ' + balance)
    await postWindowGrumpyPawthSwap.setSwapLimit(mapping.Address, balance)
  }
};

const mappings = [
  {
    "Address": "0xE07Cb1c63ECFf5fdA2a18aCE4C1E603B09e1cAc6",
    "Balance": "100,000.00"
  },
  {
    "Address": "0xc6C1c2d9169b2927912074D80b7eA195AE512d52",
    "Balance": "100,000.00"
  },
  {
    "Address": "0xf1d15f609a85c4757a6972a200e2e2202c619481",
    "Balance": "2,175.73"
  },
  {
    "Address": "0x878582f29007182a1ba29bd00813a21ebff3b876",
    "Balance": "2,184.57"
  },
  {
    "Address": "0xdbddbc9361b9b85f771defb16696b770eb259496",
    "Balance": "1,214,827,162.96"
  },
  {
    "Address": "0xd1e5ef7d79d59cd080f2a0210b829e5c11c51e7f",
    "Balance": "1,214,843,836.20"
  },
  {
    "Address": "0x16047fda047c2b5098e1337a946548af8289042a",
    "Balance": "1,218,041,981.47"
  },
  {
    "Address": "0x561af6063e13dd24369e934b869a0dd9f1e37dc6",
    "Balance": "1,218,330,434.61"
  },
  {
    "Address": "0xbf922a4b7f6c1b8a42799b37f5bd6ab68763dde6",
    "Balance": "1,218,341,108.05"
  },
  {
    "Address": "0x0bf6668811590f93c3be7a6b674c906cdeaf0df9",
    "Balance": "1,218,787,641.27"
  },
  {
    "Address": "0x6490f6cd456fbcc78e0969af75cb1b140dd268f1",
    "Balance": "1,219,903,035.81"
  },
  {
    "Address": "0xfba71b939424fb16783f923bf6481140bdb68653",
    "Balance": "1,220,243,340.38"
  },
  {
    "Address": "0x07973abed7de576ea96546a82b4129bc1edad7ec",
    "Balance": "1,221,087,749.30"
  },
  {
    "Address": "0x67744f4b07a3708da6a2362739cc0872e81a6555",
    "Balance": "1,224,478,151.11"
  },
  {
    "Address": "0x9659e3786ffe9a0c40eb4fd2acd5c0ec10ba47bd",
    "Balance": "1,227,061,358.45"
  },
  {
    "Address": "0x60b8c676123ab6356cded93f9fe7bbc636b2db6a",
    "Balance": "1,227,319,330.53"
  },
  {
    "Address": "0x3b08aa5d3301283f242f38eed782da84d4bff5d2",
    "Balance": "1,227,600,152.22"
  },
  {
    "Address": "0x05edd25876e1c8dbc203efb62ca60f9b7b8ae850",
    "Balance": "1,229,142,127.34"
  },
  {
    "Address": "0x75aa976cabab6cbb1e4d20af0d9018a837c23da0",
    "Balance": "1,229,584,407.06"
  },
  {
    "Address": "0xad80f0c0377f906ef30dce3ee77ac9259913a964",
    "Balance": "1,231,788,612.62"
  },
  {
    "Address": "0xf527d240e2383c52658d4555ccb2cf72060c288c",
    "Balance": "1,231,829,743.98"
  },
  {
    "Address": "0xad999bab9751cd7f650f5e3d088a854cf3118b77",
    "Balance": "1,232,365,962.66"
  },
  {
    "Address": "0x8f4b59f8c049eac5caf9a36b3580ace16baf7db4",
    "Balance": "1,233,340,916.92"
  },
  {
    "Address": "0x6a806efb671eea4ae8d0bbc3d082796ff203113c",
    "Balance": "1,233,483,520.45"
  },
  {
    "Address": "0x26f0690dec502d5d752e72aafafc2290631ddba2",
    "Balance": "1,235,998,995.99"
  },
  {
    "Address": "0x2ba569a4bb7264416e0463ea99d187ddc6880277",
    "Balance": "1,236,447,504.68"
  },
  {
    "Address": "0xb740630f9bfcda3b63883fa9a18d753216fb8fd4",
    "Balance": "1,236,958,377.48"
  },
  {
    "Address": "0x101822aea5b0459f3688fa36c91c3b00ac09f0c1",
    "Balance": "1,239,430,909.30"
  },
  {
    "Address": "0x381a087a09c499755a48b1413afde2347494d2f4",
    "Balance": "1,239,452,961.69"
  },
  {
    "Address": "0x51147cbd639e63f23c4b78f2c0676d54a0db8282",
    "Balance": "1,239,645,156.42"
  },
  {
    "Address": "0xd2f05b5f5c8515f9796c6aca7741cfc1d2495567",
    "Balance": "1,240,148,902.29"
  },
  {
    "Address": "0x3e343e7176f94507c5a79dc77f2659fe0e8f5215",
    "Balance": "1,240,575,004.49"
  },
  {
    "Address": "0xe017c648e3f4700e1f41ea9126751899cb4d041d",
    "Balance": "1,240,670,464.93"
  },
  {
    "Address": "0x0832e2d34d2496697c477f54d7c221f9e6be77a7",
    "Balance": "1,242,500,550.24"
  },
  {
    "Address": "0x1c25540f8bb2c05f55a1d4b7f4c9dbce1c73011d",
    "Balance": "1,243,800,448.26"
  },
  {
    "Address": "0x7d3c137d6be62060f045ebb26d07a37fe4f0c8fb",
    "Balance": "1,245,516,867.72"
  },
  {
    "Address": "0xbd9ecff2344130a7ff2d34e4a4d7997a88c91c51",
    "Balance": "1,246,311,713.41"
  },
  {
    "Address": "0xca4c11d5ee4ee38bb21a5d8eff73c151c1fb6eb8",
    "Balance": "1,246,574,248.83"
  },
  {
    "Address": "0x501fb17ff38447ca2a81263f4f330ae79019723e",
    "Balance": "1,247,600,408.44"
  },
  {
    "Address": "0x310155510448f35d4e4693cc60156a8457b479fb",
    "Balance": "1,248,208,157.78"
  },
  {
    "Address": "0xfe956c95151762e362a2494a12d5acca0e72143f",
    "Balance": "1,248,960,158.45"
  },
  {
    "Address": "0xc7530683bc5dcb0262354d73c544c7c5d4fbd68f",
    "Balance": "1,249,165,333.88"
  },
  {
    "Address": "0xb5bce6acc5ffbabe2eae84af99d9cfc0a9530873",
    "Balance": "1,251,208,719.30"
  },
  {
    "Address": "0xf70f480ae9e0980df4c8e924087f0e9d274c2779",
    "Balance": "1,251,677,776.71"
  },
  {
    "Address": "0x3eabbafcacc972c76b2c194e69231d472b261ee3",
    "Balance": "1,254,789,540.10"
  },
  {
    "Address": "0x67b5d9cb45735ad010454172172b24abf15ca987",
    "Balance": "1,255,534,428.40"
  },
  {
    "Address": "0x6cb50febbc4e796635963c1ea9916099c69b4bd9",
    "Balance": "1,255,588,473.51"
  },
  {
    "Address": "0x3fd45216e28bdb510bc9a1e082369a7f4604cf48",
    "Balance": "1,259,242,923.21"
  },
  {
    "Address": "0x61a623690d6850aad465a74e35c1fed819dcffdd",
    "Balance": "1,262,461,259.90"
  },
  {
    "Address": "0x710ed13218681a3022916c4c414d709b0369801f",
    "Balance": "1,263,037,075.82"
  },
  {
    "Address": "0x30b4c99ca8cd53f7d3d16fe308f7f7e5dc6368c8",
    "Balance": "1,263,203,983.34"
  },
  {
    "Address": "0x8be006fa83878969faeb581d815533885d76e803",
    "Balance": "1,263,788,447.27"
  },
  {
    "Address": "0x777c87cacd482f5f5667859bc0a83acc7c931151",
    "Balance": "1,264,654,225.99"
  },
  {
    "Address": "0xa755422c6aeac94817eaf7a39654f155823ff29c",
    "Balance": "1,264,852,631.07"
  },
  {
    "Address": "0xa327cb8fe6eb1654c39ac4b6ba10add1f48864d4",
    "Balance": "1,265,038,218.34"
  },
  {
    "Address": "0x1a5542519682555f9ecd4b821cc944ca0e4df4bb",
    "Balance": "1,265,079,567.76"
  },
  {
    "Address": "0x2b53246b075195ab0da677644ce467732a6a45dd",
    "Balance": "1,265,352,792.90"
  },
  {
    "Address": "0xd51eb77f7aabb55a4443c64c1e42c106f49c14d6",
    "Balance": "1,266,371,713.04"
  },
  {
    "Address": "0x7d32f6aa9ccc12e1a8ada32267aa3ef2f8f092b3",
    "Balance": "1,266,948,046.73"
  },
  {
    "Address": "0xcfb4ee6d98d118384f5d168d086ff0ca01797e80",
    "Balance": "1,267,049,987.25"
  },
  {
    "Address": "0xf0b3f4211808f21331952d18065921c7465efa63",
    "Balance": "1,267,463,003.60"
  },
  {
    "Address": "0xb8667e75353b103150a5e95d81f3ff9716e60a79",
    "Balance": "1,268,172,158.51"
  },
  {
    "Address": "0x3cb0e54f8839d3746ebb6f8b38794488766fd931",
    "Balance": "1,268,963,843.47"
  },
  {
    "Address": "0xd17d80b2c7d8eeefaf64c359e6aea491d53251df",
    "Balance": "1,269,251,011.95"
  },
  {
    "Address": "0xf13b16d01ea410d045fa265e4b6b1940c35b2c15",
    "Balance": "1,269,755,291.39"
  },
  {
    "Address": "0xccbf87a238391f752d594cf9407099456053fa02",
    "Balance": "1,271,560,324.01"
  },
  {
    "Address": "0x1a52ca791c5537c0f3a0f1623f8a80e8c2dfc584",
    "Balance": "1,273,218,351.18"
  },
  {
    "Address": "0x1afc092a1aef9fbd6e38e20b13a2f00a42f21462",
    "Balance": "1,273,580,358.09"
  },
  {
    "Address": "0x6ad202abd5c75fd7c3a8f57ac6ff52883aef15f7",
    "Balance": "1,273,852,659.56"
  },
  {
    "Address": "0xbb4e4f2b464c1877c3118815a72bd64af8ecfcc2",
    "Balance": "1,273,936,535.37"
  },
  {
    "Address": "0x03d6321e26cf1487e192d1d40c7fb0e6ddcba024",
    "Balance": "1,274,979,762.85"
  },
  {
    "Address": "0x6edc061a06a6cfe39a37e1ae3714f5556662c1b0",
    "Balance": "1,275,658,126.35"
  },
  {
    "Address": "0xac2aaefccc950699b2dd44b69f232b36b96ddb76",
    "Balance": "1,277,696,783.39"
  },
  {
    "Address": "0xf8e2f38320607026ad0378c3bb2a6e49fc7b1abd",
    "Balance": "1,277,981,421.58"
  },
  {
    "Address": "0x40cb86574054a8a530d66d93010f2f4e0c4350d7",
    "Balance": "1,279,396,420.93"
  },
  {
    "Address": "0x91ac8dcc819fcd82ac9fd9195bff3e87ce869eb5",
    "Balance": "1,279,415,531.54"
  },
  {
    "Address": "0x427cd8ddf004b0fbf744c4282a7b6f4afa93e15b",
    "Balance": "1,280,507,710.98"
  },
  {
    "Address": "0x34df32cf901b157a2ef42791dc84bcee836946c6",
    "Balance": "1,281,416,710.81"
  },
  {
    "Address": "0xd3247416ba97d42ad2fea69a2c5e304f666cc537",
    "Balance": "1,281,652,685.68"
  },
  {
    "Address": "0xadd3e5825e22288472aedeb24caa5f2eb7a6b050",
    "Balance": "1,284,990,042.96"
  },
  {
    "Address": "0x2633fcb7ec071d520c6062cfbc5aeb8b0c65d874",
    "Balance": "1,285,482,973.74"
  },
  {
    "Address": "0x0d2ac0a7c15414574a7f473d59e6869bf9a9e8ec",
    "Balance": "1,285,877,271.18"
  },
  {
    "Address": "0x8d41c4d90aea7103694965a0ab4d3a6a82d53d2e",
    "Balance": "1,287,169,790.51"
  },
  {
    "Address": "0xde46f629a46614ea99239fc6fb14d666680fc448",
    "Balance": "1,289,066,387.23"
  },
  {
    "Address": "0x310de9adb5481c9a96b942ec3b9f5b01272d1d37",
    "Balance": "1,289,694,267.99"
  },
  {
    "Address": "0x9b6b17ce4bff1943d14cd4eb88f42caa83989cb8",
    "Balance": "1,290,204,629.41"
  },
  {
    "Address": "0x1749ae6487c876145fa3636e7b38b399b9c85444",
    "Balance": "1,290,666,029.29"
  },
]