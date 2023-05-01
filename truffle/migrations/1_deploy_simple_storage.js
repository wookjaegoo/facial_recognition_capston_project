const ArtGrowNFT = artifacts.require("ArtGrowNFT");
// const Amaranthus = artifacts.require("Amaranthus");
const RedNotice = artifacts.require("RedNotice");


module.exports = function (deployer) {
  deployer.deploy(RedNotice);
};

// module.exports = function (deployer) {
//   deployer.deploy(Amaranthus);
// }