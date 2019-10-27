import ERC20 from "../abis/ERC20.json";
import Web3 from "web3";
import { AGENT_FLIP_ROPSTEN } from "./flipContract";
import { assetToAddress } from "../utils/assets";
import { ERC20Contract } from "./uniswap";
import BN from "bn.js";

export const web3 = new Web3(window.web3.currentProvider);

export async function getTokenAllowance(tokenAddress) {
  const contr = await new web3.eth.Contract(ERC20, tokenAddress);
  const allowance = await contr.methods
    .allowance(
      web3.eth.accounts.givenProvider.selectedAddress,
      AGENT_FLIP_ROPSTEN
    )
    .call();
  return allowance;
}

export async function setTokenAllowance(tokenAddress) {
  const contr = await new web3.eth.Contract(ERC20, tokenAddress);

  let approvedAmount =
    tokenAddress === assetToAddress("WBTC")
      ? "50000000000"
      : "500000000000000000000";

  await contr.methods.approve(AGENT_FLIP_ROPSTEN, approvedAmount).send({
    from: web3.eth.accounts.givenProvider.selectedAddress
  });
}

export async function getTokenBalance(tokenAddress) {
  const addr = web3.eth.accounts.givenProvider.selectedAddress;
  const erc20 = await ERC20Contract(tokenAddress);

  let bal = await erc20.methods.balanceOf(addr).call();
  return bal;
}
