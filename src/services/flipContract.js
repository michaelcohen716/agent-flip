import Web3 from "web3";
import AgentFlip from "../contracts/AgentFlip.json";

const infuraRopstenUrl =
  "https://ropsten.infura.io/v3/b520d227f8e1479ab2bf09aebb9ea6db";

const web3 = new Web3(window.web3.currentProvider);

export const AGENT_FLIP_ROPSTEN = "0x0e1aB9048bE836226a88B8f9f231901Cdd18BA40";

async function FlipAgent() {
  return await new web3.eth.Contract(AgentFlip.abi, AGENT_FLIP_ROPSTEN);
}

export async function approveERC20() {
  const contr = await FlipAgent();
  await contr.methods.approveERC20("0x3dff0dce5fc4b367ec91d31de3837cf3840c8284").send({
    from: web3.eth.accounts.givenProvider.selectedAddress
  })
}

export async function ethToSbtc() {
  const contr = await FlipAgent();

  const DEADLINE_FROM_NOW = 60 * 15;
  const deadline = Math.ceil(Date.now() / 1000) + DEADLINE_FROM_NOW;

  const receivedAmount = await contr.methods.swapEthForSbtc(deadline).send({
    value: web3.utils.toWei("0.1", "ether"),
    from: web3.eth.accounts.givenProvider.selectedAddress
  });

  console.log("received amt", receivedAmount);
}

export async function ethToIbtc() {
  const contr = await FlipAgent();

  const DEADLINE_FROM_NOW = 60 * 15;
  const deadline = Math.ceil(Date.now() / 1000) + DEADLINE_FROM_NOW;

  const receivedAmount = await contr.methods.swapEthForIbtc(deadline).send({
    value: web3.utils.toWei("0.1", "ether"),
    from: web3.eth.accounts.givenProvider.selectedAddress
  });

  console.log("received amt", receivedAmount);
}

export async function ethToWbtc(){
  const contr = await FlipAgent();

  await contr.methods.ethToWbtc().send({
    value: web3.utils.toWei("0.1", "ether"),
    from: web3.eth.accounts.givenProvider.selectedAddress
  })
}

export async function wbtcToEth(){
  const contr = await FlipAgent();

  await contr.methods.wbtcToEth("10000").send({
    from: web3.eth.accounts.givenProvider.selectedAddress
  })
}
