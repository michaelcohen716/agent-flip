var AgentFlip = artifacts.require("./AgentFlip.sol");
var KyberNetworkProxy = artifacts.require("./KyberNetworkProxy.sol");

// module.exports = function(deployer, network, accounts) {
// 	return deployer.then(async () => {
// 		if (network == "ropsten") {	
// 			let KyberProxyContract = "0x818E6FECD516Ecc3849DAf6845e3EC868087B755";
// 			await deployer.deploy(AgentFlip, KyberProxyContract);
// 		}
// 	})

module.exports = async function(deployer) {
	deployer.deploy(AgentFlip, "0x818e6fecd516ecc3849daf6845e3ec868087b755");
}
