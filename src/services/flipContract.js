import Web3 from "web3";
import { ethers } from "ethers";
import AgentFlip from "../contracts/AgentFlip.json";
let web3;
if(window.ethereum){
  web3 = new Web3(window.ethereum)
}

export const AGENT_FLIP_ROPSTEN = "0x826361CA8cfd866030F1973e0f79eE772a92BC31";
// export const AGENT_FLIP_ROPSTEN = "0x414ca23afe8EDFd394db2aC21Dd4C3Bc99a34774";

async function FlipAgent() {
  return await new web3.eth.Contract(AgentFlip.abi, AGENT_FLIP_ROPSTEN);
}

export async function FlipAgentEthers(){
  let provider = ethers.getDefaultProvider('ropsten');
  let contract = new ethers.Contract(AGENT_FLIP_ROPSTEN, AgentFlip.abi, provider);
  console.log('flip agent', contract)
  return contract;
}

export async function approveERC20() {
  const contr = await FlipAgent();
  await contr.methods.approveERC20("0x3dff0dce5fc4b367ec91d31de3837cf3840c8284").send({
    from: web3.eth.accounts.givenProvider.selectedAddress
  })
}

export async function ethToSbtc(amount) {
  const contr = await FlipAgent();

  const DEADLINE_FROM_NOW = 60 * 15;
  const deadline = Math.ceil(Date.now() / 1000) + DEADLINE_FROM_NOW;

  await contr.methods.swapEthForSbtc(deadline).send({
    value: web3.utils.toWei(String(amount), "ether"),
    from: web3.eth.accounts.givenProvider.selectedAddress
  });
}

export async function ethToIbtc(amount) {
  const contr = await FlipAgent();

  const DEADLINE_FROM_NOW = 60 * 15;
  const deadline = Math.ceil(Date.now() / 1000) + DEADLINE_FROM_NOW;

  const receivedAmount = await contr.methods.swapEthForIbtc(deadline).send({
    value: web3.utils.toWei(String(amount), "ether"),
    from: web3.eth.accounts.givenProvider.selectedAddress
  });
}

export async function ethToWbtc(amount){
  const contr = await FlipAgent();

  await contr.methods.ethToWbtc().send({
    value: web3.utils.toWei(String(amount), "ether"),
    from: web3.eth.accounts.givenProvider.selectedAddress
  })
}

export async function wbtcToEth(amount){
  const contr = await FlipAgent();

  const parsedAmount = Number(amount) * 10**8;
  await contr.methods.wbtcToEth(parsedAmount).send({
    from: web3.eth.accounts.givenProvider.selectedAddress,
  })
}

export async function wbtcToSbtc(amount){
  const contr = await FlipAgent();

  const DEADLINE_FROM_NOW = 60 * 15;
  const deadline = Math.ceil(Date.now() / 1000) + DEADLINE_FROM_NOW;

  const parsedAmount = Number(amount) * 10**8;
  await contr.methods.wbtcToSbtc(parsedAmount, deadline).send({
    from: web3.eth.accounts.givenProvider.selectedAddress
  })

}

export async function wbtcToIbtc(amount){
  const contr = await FlipAgent();

  const DEADLINE_FROM_NOW = 60 * 15;
  const deadline = Math.ceil(Date.now() / 1000) + DEADLINE_FROM_NOW;
  
  const parsedAmount = Number(amount) * 10**8;
  await contr.methods.wbtcToIbtc(parsedAmount, deadline).send({
    from: web3.eth.accounts.givenProvider.selectedAddress
  })
}

export async function sbtcToEth(amount){
  const contr = await FlipAgent();

  const DEADLINE_FROM_NOW = 60 * 15;
  const deadline = Math.ceil(Date.now() / 1000) + DEADLINE_FROM_NOW;

  const parsedAmount = Number(amount) * 10**18
  await contr.methods.sbtcToEth(parsedAmount, deadline).send({
    from: web3.eth.accounts.givenProvider.selectedAddress
  })
}

export async function sbtcToWbtc(amount){
  const contr = await FlipAgent();

  const DEADLINE_FROM_NOW = 60 * 15;
  const deadline = Math.ceil(Date.now() / 1000) + DEADLINE_FROM_NOW;

  const parsedAmount = Number(amount) * 10**18
  await contr.methods.sbtcToWbtc(parsedAmount, deadline).send({
    from: web3.eth.accounts.givenProvider.selectedAddress
  })
}

export async function sbtcToIbtc(amount){
  const contr = await FlipAgent();
  const parsedAmount = Number(amount) * 10**18

  await contr.methods.sbtcToIbtc(parsedAmount).send({
    from: web3.eth.accounts.givenProvider.selectedAddress
  })
}

export async function ethToCdai(){
  const contr = await FlipAgent();
  await contr.methods.ethToCdai().send({
    from: web3.eth.accounts.givenProvider.selectedAddress,
    value: web3.utils.toWei("0.1", "ether"),
  })
}

export async function ibtcToEth(amount){
  const contr = await FlipAgent();

  const DEADLINE_FROM_NOW = 60 * 15;
  const deadline = Math.ceil(Date.now() / 1000) + DEADLINE_FROM_NOW;

  const parsedAmount = Number(amount) * 10**18
  await contr.methods.ibtcToEth(parsedAmount, deadline).send({
    from: web3.eth.accounts.givenProvider.selectedAddress
  })
}