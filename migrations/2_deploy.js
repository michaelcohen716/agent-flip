var AgentFlip = artifacts.require("./AgentFlip.sol");
const KyberProxy = artifacts.require("./KyberNetworkProxy")

module.exports = async function(deployer) {
	// const Kyber = await deployer.deploy(KyberProxy, "0x818e6fecd516ecc3849daf6845e3ec868087b755")
	deployer.deploy(AgentFlip, "0x818e6fecd516ecc3849daf6845e3ec868087b755");
}
