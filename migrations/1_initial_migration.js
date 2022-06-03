const Migrations = artifacts.require("DNS_Storage");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
