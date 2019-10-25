var AgentFlip = artifacts.require("./AgentFlip.sol");

module.exports = async function(deployer) {
	deployer.deploy(AgentFlip, "0x818e6fecd516ecc3849daf6845e3ec868087b755");
}
