import React from "react";
import {
  createTokenExchange,
  addLiquidity,
  approveERC20,
  sethForEth,
  ethForSeth
} from "../services/uniswap";
import AgentFlip from "../contracts/AgentFlip.json";
import { ethToSbtc, ethToIbtc } from "../services/flipContract";
import getWeb3 from "../getWeb3";

const AGENT_FLIP_ROPSTEN = "0x0D92DfC09d019e5a0CdBCC6C437f9B860349c571";

class Admin extends React.Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    pk: "1E25C8731DE51F919A23EF70749251BB4F57D80BFD6468FC450FD79D39E3B87C"
  };

  //   kyber
  // trade = async () => {
  //   const { accounts, web3 } = this.state;
  //   let maxDest = new BN(1000000);
  //   //   console.log('max dest', maxDest)
  //   maxDest = web3.utils.toWei(maxDest);
  //   //   console.log('max dest', maxDest)
  //   const retVal = await this.state.contract.methods
  //     .executeSwap(
  //       "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  //       "1000000000000000000",
  //       "0xad6d458402f60fd3bd25163575031acdce07538d",
  //       "0xd01ae9c9da06bcb259803341a61af7a516645a32",
  //       maxDest
  //     )
  //     .send({ from: accounts[0] });
  //   console.log("retval", retVal);
  // };

  createExchange = async () => {
    const { pk } = this.state;
    await createTokenExchange(pk);
  };

  addLiquidityToPool = async () => {
    const { pk } = this.state;
    await addLiquidity(pk);
  };

  approve = async () => {
    const { pk } = this.state;
    await approveERC20(pk);
  };

  tradeSethForEth = async () => {
    const { pk } = this.state;
    await sethForEth("0.6", pk);
  };

  tradeEthForSbtc = async () => {
    await ethToSbtc()
  };

  tradeEthForIbtc = async () => {
    await ethToIbtc();
  };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const instance = new web3.eth.Contract(AgentFlip.abi, AGENT_FLIP_ROPSTEN);

      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  render() {
    return (
      <React.Fragment>
        <button onClick={this.createExchange}>createExchange</button>
        <button onClick={this.tradeSethForEth}>trade seth for eth</button>
        <button onClick={this.tradeEthForSeth}>trade eth for seth</button>
        <button onClick={this.addLiquidityToPool}>add Liquidity</button>
        <button onClick={this.approve}>approve</button>
        <button onClick={this.tradeEthForSbtc}>swap eth for sbtc</button>
        <button onClick={this.tradeEthForIbtc}>swap eth for ibtc</button>
      </React.Fragment>
    );
  }
}

export default Admin;
