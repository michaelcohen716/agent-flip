import React from "react";
import Admin from "./components/Admin";
import Base from "./components/Base";
import Web3Provider, { Connectors } from "web3-react";
import "./App.css";

const { InjectedConnector } = Connectors;
const MetaMask = new InjectedConnector({ supportedNetworks: [3] });
const connectors = { MetaMask };

class App extends React.Component {
  render() {
    return (
      <Web3Provider connectors={connectors} libraryName={"web3.js"}>
        <div className="App">
          <Base />
        </div>
      </Web3Provider>
    );
  }
}

export default App;
