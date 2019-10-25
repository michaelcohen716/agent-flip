import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Web3Provider, { Connectors } from "web3-react";
import AgentFlip from "./contracts/AgentFlip.json";

import {
  createTokenExchange,
  addLiquidity,
  approveERC20,
  sethForEth,
  ethForSeth
} from "./services/uniswap";
import { swapEthForSbtc, swapEthForIbtc } from "./services/flipContract";

import getWeb3 from "./getWeb3";
// const web3 = new Web3(window.web3);
const BN = require("bn.js");

const AGENT_FLIP_ROPSTEN = "0x0D92DfC09d019e5a0CdBCC6C437f9B860349c571";
// const contr = new web3.eth.Contract(AgentFlip.abi, AGENT_FLIP_ROPSTEN)
// console.log(contr)

const SYNTHETIX_PROXY_ROPSTEN = "0x013AE307648f529aa72c5767A334DDd37aaB43c3";

const { InjectedConnector } = Connectors;
const MetaMask = new InjectedConnector({ supportedNetworks: [4] });
const connectors = { MetaMask };

class App extends React.Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    pk: "1E25C8731DE51F919A23EF70749251BB4F57D80BFD6468FC450FD79D39E3B87C"
  };

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
    await sethForEth("0.08", pk);
  };

  tradeEthForSbtc = async () => {
    await swapEthForSbtc();
  };

  tradeEthForIbtc = async () => {
    await swapEthForIbtc();
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

  render() {
    console.log(window.web3);
    return (
      <Web3Provider
        connectors={connectors}
        libraryName={"web3.js"}
      >
        <div className="App">
          <button onClick={this.createExchange}>createExchange</button>
          <button onClick={this.tradeSethForEth}>trade seth for eth</button>
          <button onClick={this.tradeEthForSeth}>trade eth for seth</button>
          <button onClick={this.addLiquidityToPool}>add Liquidity</button>
          <button onClick={this.approve}>approve</button>
          <button onClick={this.tradeEthForSbtc}>swap eth for sbtc</button>
          <button onClick={this.tradeEthForIbtc}>swap eth for ibtc</button>
        </div>
      </Web3Provider>
    );
  }
}

export default App;
