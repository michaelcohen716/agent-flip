import Web3 from "web3";
import AgentFlip from "../contracts/AgentFlip.json";
// import getWeb3 from "../getWeb3";
let web3;
if(window.ethereum){
  web3 = new Web3(window.ethereum)
}

// const web3 = getWeb3();
// const web3 = new Web3(window.web3.currentProvider);

export const AGENT_FLIP_ROPSTEN = "0x414ca23afe8EDFd394db2aC21Dd4C3Bc99a34774";

async function FlipAgent() {
  return await new web3.eth.Contract(AgentFlip.abi, AGENT_FLIP_ROPSTEN);
}

// const from = web3.eth.accounts.givenProvider.selectedAddress

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

export async function wbtcToIbtc(){
  const contr = await FlipAgent();

  const DEADLINE_FROM_NOW = 60 * 15;
  const deadline = Math.ceil(Date.now() / 1000) + DEADLINE_FROM_NOW;

  await contr.methods.wbtcToIbtc("2000", deadline).send({
    from: web3.eth.accounts.givenProvider.selectedAddress
  })
}

export async function sbtcToEth(){
  const contr = await FlipAgent();

  const DEADLINE_FROM_NOW = 60 * 15;
  const deadline = Math.ceil(Date.now() / 1000) + DEADLINE_FROM_NOW;

  await contr.methods.sbtcToEth("2000", deadline).send({
    from: web3.eth.accounts.givenProvider.selectedAddress
  })
}

export async function sbtcToWbtc(){
  const contr = await FlipAgent();

  const DEADLINE_FROM_NOW = 60 * 15;
  const deadline = Math.ceil(Date.now() / 1000) + DEADLINE_FROM_NOW;

  await contr.methods.sbtcToWbtc("2000", deadline).send({
    from: web3.eth.accounts.givenProvider.selectedAddress
  })
}

export async function sbtcToIbtc(){
  const contr = await FlipAgent();
  await contr.methods.sbtcToIbtc("2000").send({
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

export async function ibtcToEth(){
  const contr = await FlipAgent();

  const DEADLINE_FROM_NOW = 60 * 15;
  const deadline = Math.ceil(Date.now() / 1000) + DEADLINE_FROM_NOW;

  await contr.methods.ibtcToEth("10000", deadline).send({
    from: web3.eth.accounts.givenProvider.selectedAddress
  })
}