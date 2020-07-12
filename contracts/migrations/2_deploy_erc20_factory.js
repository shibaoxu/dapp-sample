// const ConvertLib = artifacts.require("ConvertLib");
// const MetaCoin = artifacts.require("MetaCoin");
const factory = artifacts.require("ERC20Factory");

module.exports = function(deployer) {
  deployer.deploy(factory);
};
